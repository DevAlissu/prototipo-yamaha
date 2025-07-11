import { create } from "zustand";
import { message } from "antd";
import { EquipamentItem } from "@/types/equipaments";
import api from "@/services/api";

interface EquipamentsState {
  equipaments: EquipamentItem[];
  loading: boolean;
  fetchEquipaments: () => Promise<void>;
  fetchEquipamentById: (id: number) => Promise<EquipamentItem>;
  createEquipament: (data: any) => Promise<void>;
  updateEquipament: (id: number, data: any) => Promise<void>;
  deleteEquipament: (id: number) => Promise<void>;
}

export const useEquipamentsStore = create<EquipamentsState>((set) => ({
  equipaments: [],
  loading: false,

  fetchEquipaments: async () => {
    set({ loading: true });
    try {
      const response = await api.get<EquipamentItem[]>("/equipaments/");
      set(() => ({ equipaments: response.data }));
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
      message.error("Erro ao carregar os equipamentos!");
    } finally {
      set(() => ({ loading: false }));
    }
  },

  fetchEquipamentById: async (id: number) => {
    try {
      const response = await api.get<EquipamentItem>(`/equipaments/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar equipamento:", error);
      message.error("Erro ao carregar os dados do equipamento!");
      throw error;
    }
  },

  createEquipament: async (data: any) => {
    try {
      const response = await api.post("/equipaments/", data);
      set((state) => ({
        equipaments: [...state.equipaments, response.data],
      }));
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      message.error("Erro ao cadastrar equipamento!");
    }
  },

  updateEquipament: async (id: number, data: any) => {
    try {
      await api.put(`/equipaments/${id}/`, data);
      set((state) => ({
        equipaments: state.equipaments.map((equipament) =>
          equipament.id === id ? { ...equipament, ...data } : equipament
        ),
      }));
      message.success("Equipamento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
      message.error("Erro ao atualizar equipamento!");
    }
  },

  deleteEquipament: async (id: number) => {
    try {
      await api.delete(`/equipaments/${id}/`);
      set((state) => ({
        equipaments: state.equipaments.filter((equipament) => equipament.id !== id),
      }));
      message.success("Equipamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error);
      message.error("Erro ao excluir equipamento!");
    }
  },
}));