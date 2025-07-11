// src/store/parametersMonitoringStore.ts
import { create } from "zustand";
import {
  getParametersBySection,
  createParameters,
  updateParameters,
} from "@/services/parametersMonitoringService";
import {
  ParametersMonitoringItem,
  ParametersMonitoringCreate,
} from "@/types/parametersMonitoring";

interface State {
  parameters: ParametersMonitoringItem | null;
  loading: boolean;
  fetchParameters: (sectionId: number) => Promise<void>;
  saveParameters: (
    sectionId: number,
    data: ParametersMonitoringCreate
  ) => Promise<void>;
}

export const useParametersMonitoringStore = create<State>((set) => ({
  parameters: null,
  loading: false,

  fetchParameters: async (sectionId) => {
    set({ loading: true });
    try {
      const params = await getParametersBySection(sectionId);
      set({ parameters: params });
    } finally {
      set({ loading: false });
    }
  },

  saveParameters: async (sectionId, data) => {
    set({ loading: true });
    try {
      // Se já existe, faz update, senão cria
      const params = await getParametersBySection(sectionId);
      if (params) {
        await updateParameters(params.id, data);
      } else {
        await createParameters(data);
      }
      // Atualiza o store
      const updated = await getParametersBySection(sectionId);
      set({ parameters: updated });
    } finally {
      set({ loading: false });
    }
  },
}));
