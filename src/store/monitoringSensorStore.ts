// src/store/monitoringSensorStore.ts
import { create } from "zustand";
import {
  fetchMonitoringsSensor,
  createMonitoringSensor,
  updateMonitoringSensor,
  deleteMonitoringSensor,
  fetchSectionsForSensor,
  createSectionForSensor,
  getSectionByIdForSensor,
  updateSectionForSensor,
  deleteSectionForSensor,
} from "@/services/monitoringSensorService";
import type { MonitoringItem } from "@/types/monitoringTypes";

export interface SectionSimple {
  id: number;
  name: string; // <-- Adicione esta linha!
  description: string;
  is_monitored: boolean;
  monitoring: number | null;
  device_iots?: number[];
  // Pode incluir outros campos se quiser (secticon_parent etc)
}
interface MonitoringSensorState {
  monitorings: MonitoringItem[];
  sections: SectionSimple[];
  loadingMonitorings: boolean;
  loadingSections: boolean;

  fetchAllMonitorings: () => Promise<void>;
  fetchSectionsForMonitoring: (monitoringId: number) => Promise<void>;
  createMonitoring: (data: {
    name: string;
    description: string;
    estimated_consumption: number;
    type_mmonitoring: string;
  }) => Promise<void>;
  updateMonitoring: (
    id: number,
    data: Partial<
      Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
    >
  ) => Promise<void>;
  deleteMonitoring: (id: number) => Promise<void>;

  createSectionForMonitoring: (
    monitoringId: number,
    data: Partial<SectionSimple>
  ) => Promise<void>;
  fetchSingleSection: (sectionId: number) => Promise<SectionSimple>;
  updateSectionForMonitoring: (
    id: number,
    data: Partial<SectionSimple>
  ) => Promise<void>;
  deleteSectionById: (id: number) => Promise<void>;
}

export const useMonitoringSensorStore = create<MonitoringSensorState>(
  (set, get) => ({
    monitorings: [],
    sections: [],
    loadingMonitorings: false,
    loadingSections: false,

    // 1) Busca todos monitoramentos “Nansenson” (AJUSTADO: filtro por tipo!)
    fetchAllMonitorings: async () => {
      set({ loadingMonitorings: true });
      try {
        const list = await fetchMonitoringsSensor();
        set({
          monitorings: list.filter(
            (m: any) => m.type_mmonitoring === "Nansenson"
          ),
        });
      } catch (err) {
        console.error("Erro ao buscar monitoramentos Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 2) Busca seções vinculadas a um monitoringId específico
    fetchSectionsForMonitoring: async (monitoringId) => {
      set({ loadingSections: true });
      try {
        const list = await fetchSectionsForSensor(monitoringId);
        const simplified = list.map((sec: any) => ({
          id: sec.id,
          name: sec.name ?? "-",
          description: sec.description ?? "",
          is_monitored: sec.is_monitored,
          monitoring: sec.monitoring,
          secticon_parent: sec.secticon_parent ?? null, // já prepara pro futuro!
          device_iots: sec.device_iots ?? [], // prepara chips IoT
        }));

        set({ sections: simplified });
      } catch (err) {
        console.error("Erro ao buscar seções para Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 3) Cria monitoramento “Nansenson”
    createMonitoring: async (data) => {
      set({ loadingMonitorings: true });
      try {
        const created = await createMonitoringSensor(data);
        set((state) => ({ monitorings: [...state.monitorings, created] }));
      } catch (err) {
        console.error("Erro ao criar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 4) Atualiza monitoramento existente
    updateMonitoring: async (id, data) => {
      set({ loadingMonitorings: true });
      try {
        const updated = await updateMonitoringSensor(id, data);
        set((state) => ({
          monitorings: state.monitorings.map((m) =>
            m.id === id ? updated : m
          ),
        }));
      } catch (err) {
        console.error("Erro ao atualizar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 5) Deleta um monitoramento
    deleteMonitoring: async (id) => {
      set({ loadingMonitorings: true });
      try {
        await deleteMonitoringSensor(id);
        set((state) => ({
          monitorings: state.monitorings.filter((m) => m.id !== id),
        }));
      } catch (err) {
        console.error("Erro ao deletar monitoramento Nansenson:", err);
      } finally {
        set({ loadingMonitorings: false });
      }
    },

    // 6) Cria seção para o monitoringId
    createSectionForMonitoring: async (monitoringId, data) => {
      set({ loadingSections: true });
      try {
        await createSectionForSensor({ ...data, monitoring: monitoringId });
        // Após criar, recarrega a lista de seções
        await get().fetchSectionsForMonitoring(monitoringId);
      } catch (err) {
        console.error("Erro ao criar seção para Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 7) Busca uma única seção por ID
    // 7) Busca uma única seção por ID
    fetchSingleSection: async (sectionId) => {
      const sec = await getSectionByIdForSensor(sectionId);
      return {
        id: sec.id,
        name: sec.name ?? sec.description ?? "-", // <-- Corrige aqui!
        description: sec.description ?? "",
        is_monitored: sec.is_monitored,
        monitoring: sec.monitoring,
        secticon_parent: sec.secticon_parent ?? null,
        device_iots: sec.device_iots ?? [],
      };
    },

    // 8) Atualiza seção
    updateSectionForMonitoring: async (id, data) => {
      set({ loadingSections: true });
      try {
        await updateSectionForSensor(id, data);
      } catch (err) {
        console.error("Erro ao atualizar seção Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },

    // 9) Deleta seção
    deleteSectionById: async (id) => {
      set({ loadingSections: true });
      try {
        await deleteSectionForSensor(id);
      } catch (err) {
        console.error("Erro ao deletar seção Nansenson:", err);
      } finally {
        set({ loadingSections: false });
      }
    },
  })
);
