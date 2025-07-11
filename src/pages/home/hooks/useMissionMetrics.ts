// src/pages/home/hooks/useMissionMetrics.ts
import { useEffect, useState } from "react";
import { useMissionStore } from "@/store/missions";
import { MissionItem } from "@/types/missions";

export interface MissionMetrics {
  missionsInProgress: number;
  missionsCompleted: number;
  missionsPending: number;
  totalMissions: number;
}

export function useMissionMetrics(): MissionMetrics {
  const { missions, fetchMissions } = useMissionStore();
  const [metrics, setMetrics] = useState<MissionMetrics>({
    missionsInProgress: 0,
    missionsCompleted: 0,
    missionsPending: 0,
    totalMissions: 0,
  });

  // Carregar missões
  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  // Calcular métricas quando missions mudar
  useEffect(() => {
    const missionsInProgress = missions.filter(
      (mission) => mission.status === "Em Andamento"
    ).length;

    const missionsCompleted = missions.filter(
      (mission) => mission.status === "Finalizada"
    ).length;

    const missionsPending = missions.filter(
      (mission) => mission.status === "Pendente"
    ).length;

    setMetrics({
      missionsInProgress,
      missionsCompleted,
      missionsPending,
      totalMissions: missions.length,
    });
  }, [missions]);

  return metrics;
}