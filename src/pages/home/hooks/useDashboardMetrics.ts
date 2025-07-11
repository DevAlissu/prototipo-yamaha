// src/pages/home/hooks/useDashboardMetrics.ts
import { useEffect } from "react";
import { useMonitoringStore } from "@/store/monitoringStore";
import { useSectionStore } from "@/store/sectionStore";
import { SectionItem } from "@/types/sections";

export interface DashboardMetrics {
  activeMonitoringCount: number;
  totalSectionsCount: number;
  totalSectorsCount: number;
  totalDevicesCount: number;
}

export function useDashboardMetrics(): DashboardMetrics {
  // Seletores do Zustand
  const activeMonitoringCount = useMonitoringStore((s) => s.activeCount);
  const fetchActiveCount = useMonitoringStore((s) => s.fetchActiveCount);
  const sections = useSectionStore((s) => s.sections);
  const fetchSections = useSectionStore((s) => s.fetchSections);

  // Carregar dados uma vez ao montar
  useEffect(() => {
    fetchSections();
    fetchActiveCount();
  }, [fetchSections, fetchActiveCount]);

  // Quantidade de setores (nível raiz)
  const totalSectorsCount = sections.length;

  // Quantidade total de seções (inclui subseções recursivamente)
  const countAllSections = (list: SectionItem[]): number => {
    return list.reduce(
      (sum, s) => sum + 1 + countAllSections(s.sections_filhas || []),
      0
    );
  };
  const totalSectionsCount = countAllSections(sections);

  // Somar dispositivos IoT em todas as seções de primeiro nível
  const totalDevicesCount = sections.reduce((sum, s) => {
    const devices = Array.isArray((s as any).DeviceIot)
      ? (s as any).DeviceIot.length
      : 0;
    return sum + devices;
  }, 0);

  return {
    activeMonitoringCount,
    totalSectionsCount,
    totalSectorsCount,
    totalDevicesCount,
  };
}
