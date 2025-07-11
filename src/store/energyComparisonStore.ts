// src/store/energyComparisonStore.ts
import { create } from "zustand";
import { fetchMissionsEnergyByDate } from "../services/energymissionsService";

interface Period {
  start: Date | null;
  end: Date | null;
}

interface EnergyComparisonState {
  monitoringId: number | null;
  periodWithMission: Period;
  periodWithoutMission: Period;
  valueWithMission: number | null;
  valueWithoutMission: number | null;
  loading: boolean;
  economy: number | null;
  efficiency: number | null;
  setMonitoringId: (id: number) => void;
  setPeriodWithMission: (start: Date, end: Date) => void;
  setPeriodWithoutMission: (start: Date, end: Date) => void;
  fetchValues: () => Promise<void>;
  reset: () => void;
}

export const useEnergyComparisonStore = create<EnergyComparisonState>(
  (set, get) => ({
    monitoringId: null,
    periodWithMission: { start: null, end: null },
    periodWithoutMission: { start: null, end: null },
    valueWithMission: null,
    valueWithoutMission: null,
    loading: false,
    economy: null,
    efficiency: null,

    setMonitoringId: (id) => set({ monitoringId: id }),
    setPeriodWithMission: (start, end) =>
      set({ periodWithMission: { start, end } }),
    setPeriodWithoutMission: (start, end) =>
      set({ periodWithoutMission: { start, end } }),

    fetchValues: async () => {
      const { monitoringId, periodWithMission, periodWithoutMission } = get();

      if (
        !monitoringId ||
        !periodWithMission.start ||
        !periodWithMission.end ||
        !periodWithoutMission.start ||
        !periodWithoutMission.end
      ) {
        return;
      }

      set({ loading: true });

      try {
        // Busca os dois valores
        const [withMission, withoutMission] = await Promise.all([
          fetchMissionsEnergyByDate(
            monitoringId,
            periodWithMission.start,
            periodWithMission.end,
            true
          ),
          fetchMissionsEnergyByDate(
            monitoringId,
            periodWithoutMission.start,
            periodWithoutMission.end,
            false
          ),
        ]);

        // Calcula economia e eficiência
        const economy = withoutMission - withMission;
        const efficiency =
          withoutMission > 0 ? (economy / withoutMission) * 100 : 0;

        set({
          valueWithMission: withMission,
          valueWithoutMission: withoutMission,
          economy,
          efficiency,
        });
      } finally {
        set({ loading: false });
      }
    },

    reset: () =>
      set({
        periodWithMission: { start: null, end: null },
        periodWithoutMission: { start: null, end: null },
        valueWithMission: null,
        valueWithoutMission: null,
        economy: null,
        efficiency: null,
        loading: false,
      }),
  })
);
