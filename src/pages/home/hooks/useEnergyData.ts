import { useEffect, useState } from "react";
import api from "@/services/api";

export interface EnergyMeasurement {
  id: number;
  energia_ativa_kWh: number;
  interval: number;
  section: number;
}

export const useEnergyData = (sectionId?: number) => {
  const [data, setData] = useState<EnergyMeasurement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      setData([]);
      return;
    }

    let mounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await api.get<EnergyMeasurement[]>(
          `/section-measurements/?section_id=${sectionId}`
        );
        const clean = response.data.filter(
          (m) =>
            typeof m.energia_ativa_kWh === "number" &&
            !Number.isNaN(m.energia_ativa_kWh)
        );
        if (mounted) setData(clean);
      } catch (error) {
        console.error("Erro ao buscar dados de energia:", error);
        if (mounted) setData([]); // Só zera se erro real
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [sectionId]);

  return { data, loading };
};
