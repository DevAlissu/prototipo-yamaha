import { create } from "zustand";

interface Period {
  start: Date | null;
  end: Date | null;
}

interface MonitoringDashboardState {
  // Seleção principal
  selectedMonitoringId: number | null;
  
  // Períodos
  firstPeriod: Period;
  secondPeriod: Period;
  
  // Dados calculados
  valueFirstPeriod: number | null;
  valueSecondPeriod: number | null;
  difference: number | null;
  percentageDifference: number | null;
  loading: boolean;
  
  // Actions
  setSelectedMonitoringId: (id: number | null) => void;
  setFirstPeriod: (start: Date | null, end: Date | null) => void;
  setSecondPeriod: (start: Date | null, end: Date | null) => void;
  setCalculatedValues: (values: {
    valueFirstPeriod: number | null;
    valueSecondPeriod: number | null;
    difference: number | null;
    percentageDifference: number | null;
  }) => void;
  setLoading: (loading: boolean) => void;
  resetAll: () => void;
}

export const useMonitoringDashboardStore = create<MonitoringDashboardState>((set, get) => ({
  // Estado inicial
  selectedMonitoringId: null,
  firstPeriod: { start: null, end: null },
  secondPeriod: { start: null, end: null },
  valueFirstPeriod: null,
  valueSecondPeriod: null,
  difference: null,
  percentageDifference: null,
  loading: false,

  // Actions
  setSelectedMonitoringId: (id) => {
    set({
      selectedMonitoringId: id,
      // Reset periods when monitoring changes
      firstPeriod: { start: null, end: null },
      secondPeriod: { start: null, end: null },
      valueFirstPeriod: null,
      valueSecondPeriod: null,
      difference: null,
      percentageDifference: null,
    });
  },

  setFirstPeriod: (start, end) => set({
    firstPeriod: { start, end }
  }),

  setSecondPeriod: (start, end) => set({
    secondPeriod: { start, end }
  }),

  setCalculatedValues: (values) => set(values),

  setLoading: (loading) => set({ loading }),

  resetAll: () => set({
    selectedMonitoringId: null,
    firstPeriod: { start: null, end: null },
    secondPeriod: { start: null, end: null },
    valueFirstPeriod: null,
    valueSecondPeriod: null,
    difference: null,
    percentageDifference: null,
    loading: false,
  }),
}));