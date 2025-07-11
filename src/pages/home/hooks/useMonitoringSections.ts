// src/pages/home/hooks/useMonitoringSections.ts
import { useEffect, useState } from "react";
import { useSectionStore } from "@/store/sectionStore";
import { SectionItem } from "@/types/sections";

/**
 * Hook que retorna as seções relacionadas a um monitoramento específico.
 * Considera a hierarquia de setores → linhas → equipamentos.
 */
export function useMonitoringSections(monitoringId?: number) {
  const { sections, fetchSections, loading } = useSectionStore();
  const [filtered, setFiltered] = useState<SectionItem[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (!monitoringId || loading) return;

    const filterByMonitoring = (sectionList: SectionItem[]): SectionItem[] => {
      return sectionList
        .filter((s) => s.monitoring === monitoringId)
        .map((s) => ({
          ...s,
          sections_filhas: filterByMonitoring(s.sections_filhas || []),
        }));
    };

    const result = filterByMonitoring(sections);
    setFiltered(result);
  }, [monitoringId, sections, loading]);

  return { monitoringSections: filtered, loading };
}
