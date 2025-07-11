import { useEffect, useState, useMemo } from "react";
import api from "@/services/api";

export interface EnergyMeasurement {
  id: number;
  energia_ativa_kWh: number;
  interval: number;
  section: number;
}

export function useSectionsEnergyData(sectionIds: number[]) {
  const memoIds = useMemo(() => [...sectionIds], [sectionIds.join(",")]);

  const [dataMap, setDataMap] = useState<Record<number, EnergyMeasurement[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memoIds.length === 0) {
      setDataMap({});
      return;
    }
    let mounted = true;
    setLoading(true);

    Promise.all(
      memoIds.map((id) =>
        api
          .get<EnergyMeasurement[]>(`/section-measurements/?section_id=${id}`)
          .then((res) => {
            const valid = res.data.filter(
              (m) =>
                typeof m.energia_ativa_kWh === "number" &&
                !Number.isNaN(m.energia_ativa_kWh)
            );
            const slice = valid.length > 60 ? valid.slice(-60) : valid;
            return { id, data: slice };
          })
          .catch(() => ({ id, data: [] }))
      )
    )
      .then((results) => {
        if (!mounted) return;
        const map: Record<number, EnergyMeasurement[]> = {};
        results.forEach(({ id, data }) => {
          map[id] = data;
        });
        setDataMap(map);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [memoIds]);

  return { dataMap, loading };
}
