// src/pages/home/hooks/useMonitoringData.ts
import { useEffect, useState } from "react";
import { useMonitoringStore } from "@/store/monitoringStore";
import { useSectionStore } from "@/store/sectionStore";
import { useMissionStore } from "@/store/missions";
import { MonitoringItem } from "@/types/monitoringTypes";
import { SectionItem } from "@/types/sections";
import { MissionItem } from "@/types/missions";

export interface MonitoringCardData {
  id: number;
  name: string;
  description: string;
  estimated_consumption: number;
  type_mmonitoring: string;
  itensMonitorados: number;
  missoesAtivas: number;
  alerta: boolean;
  consumo: string;
}

export function useMonitoringData(): {
  monitoringData: MonitoringCardData[];
  loading: boolean;
} {
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const { sections, fetchSections } = useSectionStore();
  const { missions, fetchMissions } = useMissionStore();
  const [monitoringData, setMonitoringData] = useState<MonitoringCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar todos os dados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchMonitorings(),
        fetchSections(),
        fetchMissions(),
      ]);
      setLoading(false);
    };
    loadData();
  }, [fetchMonitorings, fetchSections, fetchMissions]);

  // Processar dados quando carregados
  useEffect(() => {
    if (monitorings.length === 0) return;

    const processedData: MonitoringCardData[] = monitorings.map((monitoring) => {
      // Contar itens monitorados (seções com dispositivos IoT)
      const monitoringSections = sections.filter(
        (section) => section.monitoring === monitoring.id
      );
      
      const itensMonitorados = monitoringSections.reduce((count, section) => {
        const hasDevices = section.device_iots && section.device_iots.length > 0;
        return hasDevices ? count + 1 : count;
      }, 0);

      // Contar missões ativas
      const activeMissions = missions.filter((mission) => {
        const missionMonitoringId = typeof mission.monitoring === 'object' 
          ? mission.monitoring?.id 
          : mission.monitoring;
        
        return missionMonitoringId === monitoring.id && 
               mission.status === "Em Andamento";
      });

      // Mock dados de alerta e consumo
      const mockAlerta = Math.random() > 0.7; // 30% chance de ter alerta
      const mockConsumo = `${(Math.random() * 100 + 50).toFixed(1)} kWh`;

      return {
        id: monitoring.id,
        name: monitoring.name,
        description: monitoring.description,
        estimated_consumption: monitoring.estimated_consumption,
        type_mmonitoring: monitoring.type_mmonitoring,
        itensMonitorados,
        missoesAtivas: activeMissions.length,
        alerta: mockAlerta,
        consumo: mockConsumo,
      };
    });

    setMonitoringData(processedData);
  }, [monitorings, sections, missions]);

  return { monitoringData, loading };
}