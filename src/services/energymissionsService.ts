// src/services/energymissionsService.ts
import api from "./api";

export interface SectionMeasurement {
  id: number;
  energia_ativa: number;
  data_recebimento: string;
}

export interface MissionBasic {
  id: number;
  name: string;
  status: string;
  date_start: string | null;
  date_end: string | null;
  description?: string;
  energy_meta?: number | null;
}

export interface MissionDateInfo {
  id: number;
  data_start: string;
  data_end: string;
}

export interface DateMissionResponse {
  status: string;
  operation: string;
  original: {
    start: string;
    end: string;
    days: number;
  };
  new_period: {
    start: string;
    end: string;
    days: number;
  };
}

// retorna o valor agregado (gráfico de barras e cards) - ROTA ORIGINAL
export async function fetchMissionsEnergyByDate(
  monitoringId: number,
  dateStart: Date,
  dateEnd: Date,
  isMission: boolean
): Promise<number> {
  const start = dateStart.toISOString().slice(0, 16) + ":00Z";
  const end = dateEnd.toISOString().slice(0, 16) + ":00Z";
  const isMissionParam = isMission ? "True" : "False";
  const url =
    `/monitorings/${monitoringId}/missions-energy-by-date/` +
    `?date_start=${start}&date_end=${end}&is_mission=${isMissionParam}`;

  console.log(`📊 Fazendo requisição para gráfico de BARRAS: ${url}`);
  
  const res = await api.get<{ valor: number }>(url);
  
  console.log(`📈 Resposta gráfico de BARRAS:`, res.data);
  
  return res.data.valor;
}

// Interface para a resposta da nova API (gráfico de linha)
interface SectionData {
  section_id: number;
  section_name: string;
  measurements: SectionMeasurement[];
}

// nova função: busca toda a lista de medições para o gráfico de linha
export async function fetchSectionMeasurements(
  monitoringId: number,
  dateStart: string, // ISO string já formatado
  dateEnd: string,
  isMission: boolean
): Promise<SectionMeasurement[]> {
  const url = `/section-measurements/${monitoringId}/date/sections/` +
    `?date_start=${dateStart}&date_end=${dateEnd}&is_mission=${isMission ? "True" : "False"}`;

  console.log(`🔍 Fazendo requisição para gráfico de linha: ${url}`);
  
  const res = await api.get<SectionData[]>(url);
  
  console.log(`📋 Resposta da API (gráfico de linha):`, res.data);
  
  // Flatten all measurements from all sections
  const allMeasurements: SectionMeasurement[] = [];
  res.data.forEach(section => {
    section.measurements.forEach(measurement => {
      allMeasurements.push({
        id: measurement.id,
        energia_ativa: measurement.energia_ativa, // Já vem como energia_ativa
        data_recebimento: measurement.data_recebimento
      });
    });
  });
  
  console.log(`🔄 Medições processadas (total: ${allMeasurements.length}):`, allMeasurements);
  
  return allMeasurements;
}

// buscar missões de um monitoramento específico
export async function fetchMissionsByMonitoring(monitoringId: number): Promise<MissionBasic[]> {
  const url = `/monitoring/${monitoringId}/missions/`;
  
  console.log(`🎯 Buscando missões do monitoramento: ${url}`);
  
  const res = await api.get<{missions: MissionBasic[]}>(url);
  
  console.log(`📋 Missões encontradas:`, res.data);
  
  return res.data.missions;
}

// buscar datas de uma missão específica
export async function fetchMissionDateById(missionId: number): Promise<MissionDateInfo> {
  const url = `/mission_date_by_id/${missionId}`;
  
  console.log(`📅 Buscando datas da missão ${missionId}: ${url}`);
  
  const res = await api.get<MissionDateInfo>(url);
  
  console.log(`🗓️ Datas da missão:`, res.data);
  
  return res.data;
}

// calcular período sem missão baseado em uma data
export async function fetchDateMissionPeriod(missionId: number, date: string): Promise<DateMissionResponse> {
  const url = `/missoes/${missionId}/date-mission/?date=${date}`;
  
  console.log(`⏰ Calculando período sem missão: ${url}`);
  
  const res = await api.get<DateMissionResponse>(url);
  
  console.log(`📊 Período calculado:`, res.data);
  
  return res.data;
}
