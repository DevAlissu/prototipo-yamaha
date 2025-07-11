import { create } from "zustand";
import { message } from "antd";
import { EnergyBillingItem } from "../types/energyBilling";
import {
  getAllBillings,
  getBillingById,
  createBilling,
  updateBilling,
  patchBilling,
  deleteBilling,
} from "../services/energyBillingService";

interface EnergyBillingState {
  billings: EnergyBillingItem[];
  loading: boolean;
  error: string | null;
  fetchBillings: () => Promise<void>;
  fetchBillingById: (id: number) => Promise<EnergyBillingItem | undefined>;
  createBilling: (data: FormData) => Promise<EnergyBillingItem | undefined>;
  updateBilling: (
    id: number,
    data: FormData
  ) => Promise<EnergyBillingItem | undefined>;
  patchBilling: (
    id: number,
    data: Partial<EnergyBillingItem>
  ) => Promise<EnergyBillingItem | undefined>;
  deleteBilling: (id: number) => Promise<void>;
}

export const useEnergyBillingStore = create<EnergyBillingState>((set, get) => ({
  billings: [],
  loading: false,
  error: null,

  fetchBillings: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllBillings();
      set({ billings: data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar faturamentos",
        loading: false,
      });
      message.error("Erro ao carregar faturamentos!");
    }
  },

  fetchBillingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const billing = await getBillingById(id);
      set({ loading: false });
      return billing;
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar faturamento",
        loading: false,
      });
      message.error("Erro ao buscar faturamento!");
      return undefined;
    }
  },

  createBilling: async (data) => {
    set({ loading: true, error: null });
    try {
      const newItem = await createBilling(data);
      message.success("Faturamento criado com sucesso!");
      await get().fetchBillings();
      set({ loading: false });
      return newItem;
    } catch (error: any) {
      set({
        error: error.message || "Erro ao criar faturamento",
        loading: false,
      });
      // Lança pro hook decidir a mensagem!
      throw error;
    }
  },

  updateBilling: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateBilling(id, data);
      message.success("Faturamento atualizado com sucesso!");
      await get().fetchBillings();
      set({ loading: false });
      return updated;
    } catch (error: any) {
      set({
        error: error.message || "Erro ao atualizar faturamento",
        loading: false,
      });
      throw error;
    }
  },

  patchBilling: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await patchBilling(id, data);
      message.success("Faturamento atualizado com sucesso!");
      await get().fetchBillings();
      set({ loading: false });
      return updated;
    } catch (error: any) {
      set({
        error: error.message || "Erro ao atualizar faturamento",
        loading: false,
      });
      message.error("Erro ao atualizar faturamento!");
      return undefined;
    }
  },

  deleteBilling: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteBilling(id);
      message.success("Faturamento deletado com sucesso!");
      await get().fetchBillings();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao deletar faturamento",
        loading: false,
      });
      message.error("Erro ao deletar faturamento!");
    }
  },
}));
