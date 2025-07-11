// src/pages/home/hooks/useMissionData.ts
import { useEffect, useState } from "react";
import { useMissionStore } from "@/store/missions";
import { useMonitoringStore } from "@/store/monitoringStore";
import { useSectionStore } from "@/store/sectionStore";
import { MissionItem } from "@/types/missions";

export interface MissionCardData {
  id: number;
  name: string;
  description: string;
  status: string;
  date_start: string;
  date_end: string | null;
  responsavel: string;
  monitoringId: number;
  monitoringName: string;
  periodo: string;
  itensMonitorados: number;
  alerta: boolean;
  consumo: string;
}

export function useMissionData(): {
  missionData: MissionCardData[];
  loading: boolean;
} {
  const { missions, fetchMissions } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const { sections, fetchSections } = useSectionStore();
  const [missionData, setMissionData] = useState<MissionCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar todos os dados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchMissions(),
        fetchMonitorings(),
        fetchSections(),
      ]);
      setLoading(false);
    };
    loadData();
  }, [fetchMissions, fetchMonitorings, fetchSections]);

  // Processar dados quando carregados
  useEffect(() => {
    if (missions.length === 0 || monitorings.length === 0) return;

    const processedData: MissionCardData[] = missions.map((mission) => {
      // Encontrar monitoramento associado
      const missionMonitoringId = typeof mission.monitoring === 'object' 
        ? mission.monitoring?.id 
        : mission.monitoring;
      
      const monitoring = monitorings.find(m => m.id === missionMonitoringId);
      
      // Contar itens monitorados (seções com dispositivos IoT) do monitoramento
      const monitoringSections = sections.filter(
        (section) => section.monitoring === missionMonitoringId
      );
      
      const itensMonitorados = monitoringSections.reduce((count, section) => {
        const hasDevices = section.device_iots && section.device_iots.length > 0;
        return hasDevices ? count + 1 : count;
      }, 0);

      // Formatar período
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
      };

      const periodo = mission.date_end 
        ? `${formatDate(mission.date_start)} - ${formatDate(mission.date_end)}`
        : `Iniciada em ${formatDate(mission.date_start)}`;

      // Mock dados de alerta e consumo
      const mockAlerta = Math.random() > 0.8; // 20% chance de ter alerta
      const mockConsumo = `${(Math.random() * 200 + 100).toFixed(1)} kWh`;

      return {
        id: mission.id,
        name: mission.name,
        description: mission.description,
        status: mission.status,
        date_start: mission.date_start,
        date_end: mission.date_end,
        responsavel: "Andrei Gomes", // Temporário - será implementado com dados reais
        monitoringId: missionMonitoringId || 0,
        monitoringName: monitoring?.name || "Monitoramento não encontrado",
        periodo,
        itensMonitorados,
        alerta: mockAlerta,
        consumo: mockConsumo,
      };
    });

    setMissionData(processedData);
  }, [missions, monitorings, sections]);

  return { missionData, loading };
}