import { create } from "zustand";
import { MissionBasic } from "@/services/energymissionsService";

interface Period {
  start: Date | null;
  end: Date | null;
}

interface DashboardState {
  // Seleções principais
  selectedMonitoringId: number | null;
  selectedMissionId: number | null;
  
  // Missões disponíveis para o monitoramento selecionado
  availableMissions: MissionBasic[];
  
  // Períodos
  periodWithMission: Period;
  periodWithoutMission: Period;
  
  // Estados de controle
  periodsReadonly: {
    withMission: boolean;
    withoutMission: boolean;
  };
  
  // Dados calculados
  valueWithMission: number | null;
  valueWithoutMission: number | null;
  economy: number | null;
  efficiency: number | null;
  loading: boolean;
  calculatingWithoutMissionPeriod: boolean;
  
  // Actions
  setSelectedMonitoringId: (id: number | null) => void;
  setSelectedMissionId: (id: number | null) => void;
  setAvailableMissions: (missions: MissionBasic[]) => void;
  setPeriodWithMission: (start: Date | null, end: Date | null) => void;
  setPeriodWithoutMission: (start: Date | null, end: Date | null) => void;
  setPeriodsReadonly: (readonly: { withMission: boolean; withoutMission: boolean }) => void;
  setCalculatedValues: (values: {
    valueWithMission: number | null;
    valueWithoutMission: number | null;
    economy: number | null;
    efficiency: number | null;
  }) => void;
  setLoading: (loading: boolean) => void;
  setCalculatingWithoutMissionPeriod: (calculating: boolean) => void;
  resetMissionData: () => void;
  resetAll: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Estado inicial
  selectedMonitoringId: null,
  selectedMissionId: null,
  availableMissions: [],
  periodWithMission: { start: null, end: null },
  periodWithoutMission: { start: null, end: null },
  periodsReadonly: { withMission: false, withoutMission: false },
  valueWithMission: null,
  valueWithoutMission: null,
  economy: null,
  efficiency: null,
  loading: false,
  calculatingWithoutMissionPeriod: false,

  // Actions
  setSelectedMonitoringId: (id) => {
    set({
      selectedMonitoringId: id,
      // Reset mission data when monitoring changes
      selectedMissionId: null,
      availableMissions: [],
      periodWithMission: { start: null, end: null },
      periodWithoutMission: { start: null, end: null },
      periodsReadonly: { withMission: false, withoutMission: false },
      valueWithMission: null,
      valueWithoutMission: null,
      economy: null,
      efficiency: null,
    });
  },

  setSelectedMissionId: (id) => {
    const state = get();
    if (id === null) {
      // Reset mission-specific data
      set({
        selectedMissionId: null,
        periodWithMission: { start: null, end: null },
        periodWithoutMission: { start: null, end: null },
        periodsReadonly: { withMission: false, withoutMission: false },
        valueWithMission: null,
        valueWithoutMission: null,
        economy: null,
        efficiency: null,
      });
    } else {
      // Find selected mission and auto-fill period
      const selectedMission = state.availableMissions.find(m => m.id === id);
      if (selectedMission && selectedMission.date_start && selectedMission.date_end) {
        set({
          selectedMissionId: id,
          periodWithMission: {
            start: new Date(selectedMission.date_start),
            end: new Date(selectedMission.date_end)
          },
          periodWithoutMission: { start: null, end: null }, // Reset período sem missão
          periodsReadonly: { withMission: true, withoutMission: false },
          valueWithMission: null,
          valueWithoutMission: null,
          economy: null,
          efficiency: null,
        });
      } else {
        set({
          selectedMissionId: id,
          periodWithoutMission: { start: null, end: null }, // Reset período sem missão
          periodsReadonly: { withMission: false, withoutMission: false },
          valueWithMission: null,
          valueWithoutMission: null,
          economy: null,
          efficiency: null,
        });
      }
    }
  },

  setAvailableMissions: (missions) => set({ availableMissions: missions }),

  setPeriodWithMission: (start, end) => set({
    periodWithMission: { start, end }
  }),

  setPeriodWithoutMission: (start, end) => set({
    periodWithoutMission: { start, end }
  }),

  setPeriodsReadonly: (readonly) => set({ periodsReadonly: readonly }),

  setCalculatedValues: (values) => set(values),

  setLoading: (loading) => set({ loading }),

  setCalculatingWithoutMissionPeriod: (calculating) => set({ calculatingWithoutMissionPeriod: calculating }),

  resetMissionData: () => set({
    selectedMissionId: null,
    periodWithMission: { start: null, end: null },
    periodWithoutMission: { start: null, end: null },
    periodsReadonly: { withMission: false, withoutMission: false },
    valueWithMission: null,
    valueWithoutMission: null,
    economy: null,
    efficiency: null,
  }),

  resetAll: () => set({
    selectedMonitoringId: null,
    selectedMissionId: null,
    availableMissions: [],
    periodWithMission: { start: null, end: null },
    periodWithoutMission: { start: null, end: null },
    periodsReadonly: { withMission: false, withoutMission: false },
    valueWithMission: null,
    valueWithoutMission: null,
    economy: null,
    efficiency: null,
    loading: false,
  }),
}));