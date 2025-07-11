import { create } from "zustand";
import { getProductionLines, createProductionLine, updateProductionLine, deleteProductionLine } from "../services/ProductionLinesService";
import { ProductionLine } from "../types/ProductionLinesTypes";

interface ProductionLinesState {
  productionLines: ProductionLine[];
  loading: boolean;
  fetchProductionLines: () => Promise<void>;
  createProductionLine: (data: Omit<ProductionLine, "id" | "created_at">) => Promise<void>;
  updateProductionLine: (id: number, data: Omit<ProductionLine, "id" | "created_at">) => Promise<void>;
  removeProductionLine: (id: number) => Promise<void>;
}

export const useProductionLinesStore = create<ProductionLinesState>((set) => ({
  productionLines: [],
  loading: false,

  fetchProductionLines: async () => {
    set({ loading: true });
    try {
      const data = await getProductionLines();
      set({ productionLines: data });
    } catch (error) {
      console.error("Erro ao buscar linhas de produção:", error);
    } finally {
      set({ loading: false });
    }
  },

  createProductionLine: async (data) => {
    set({ loading: true });
    try {
      await createProductionLine(data);
      await useProductionLinesStore.getState().fetchProductionLines(); // 🔹 Atualiza os dados
    } catch (error) {
      console.error("Erro ao criar linha de produção:", error);
    } finally {
      set({ loading: false });
    }
  },

  updateProductionLine: async (id, data) => {
    set({ loading: true });
    try {
      await updateProductionLine(id, data);
      await useProductionLinesStore.getState().fetchProductionLines();
    } catch (error) {
      console.error("Erro ao atualizar linha de produção:", error);
    } finally {
      set({ loading: false });
    }
  },

  removeProductionLine: async (id) => {
    set({ loading: true });
    try {
      await deleteProductionLine(id);
      await useProductionLinesStore.getState().fetchProductionLines();
    } catch (error) {
      console.error("Erro ao excluir linha de produção:", error);
    } finally {
      set({ loading: false });
    }
  },
}));