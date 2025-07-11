// src/store/monitoringStore.ts

import { create } from "zustand";
import api from "@/services/api";
import {
  fetchActiveMonitoringCount,
} from "@/services/monitoringService";
import { MonitoringItem } from "@/types/monitoringTypes";

interface MonitoringState {
  monitorings: MonitoringItem[];
  loading: boolean;
  activeCount: number;
  fetchMonitorings: () => Promise<void>;
  fetchActiveCount: () => Promise<void>;
  createMonitoring: (
    data: Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
  ) => Promise<void>;
  updateMonitoring: (
    id: number,
    data: Partial<
      Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
    >
  ) => Promise<void>;
  deleteMonitoring: (id: number) => Promise<void>;
}

export const useMonitoringStore = create<MonitoringState>((set) => ({
  monitorings: [],
  loading: false,
  activeCount: 0,

  // Busca lista de monitoramentos
  fetchMonitorings: async () => {
    set({ loading: true });
    try {
      const response = await api.get<MonitoringItem[]>("/monitorings/");
      set({
        monitorings: response.data.filter(
          (m) => m.type_mmonitoring === "Nansenic"
        ),
      });
    } catch (error) {
      console.error("Erro ao buscar monitoramentos:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Busca a contagem de monitoramentos ativos
  fetchActiveCount: async () => {
    try {
      const count = await fetchActiveMonitoringCount();
      set({ activeCount: count });
    } catch (error) {
      console.error("Erro ao buscar contagem de monitoramentos ativos:", error);
    }
  },

  // Criar monitoramento (adiciona type_mmonitoring = "Nansenic")
  createMonitoring: async (data) => {
    try {
      const payload = {
        ...data,
        type_mmonitoring: "Nansenic" as const,
      };
      const response = await api.post<MonitoringItem>("/monitorings/", payload);
      set((state) => ({
        monitorings: [...state.monitorings, response.data],
      }));
    } catch (error) {
      console.error("Erro ao criar monitoramento:", error);
    }
  },

  // Atualizar monitoramento (mantém o type já salvo)
  updateMonitoring: async (id, data) => {
    try {
      const response = await api.put<MonitoringItem>(
        `/monitorings/${id}/`,
        data
      );
      set((state) => ({
        monitorings: state.monitorings.map((m) =>
          m.id === id ? response.data : m
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar monitoramento:", error);
    }
  },

  // Excluir monitoramento
  deleteMonitoring: async (id) => {
    try {
      await api.delete(`/monitorings/${id}/`);
      set((state) => ({
        monitorings: state.monitorings.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir monitoramento:", error);
    }
  },
}));
