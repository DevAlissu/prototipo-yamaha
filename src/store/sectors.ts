import { create } from "zustand";
import { message } from "antd";
import {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
} from "../services/SectorsService";
import { getProductionLines } from "../services/ProductionLinesService"; // ✅ Corrigido import
import { Sector } from "../types/sectors";
import { ProductionLine } from "../types/ProductionLinesTypes"; // ✅ Corrigido import

interface SectorsState {
  sectors: Sector[];
  loading: boolean;
  fetchSectors: () => Promise<void>;
  createSector: (
    data: Omit<Sector, "id" | "created_at">
  ) => Promise<Sector | null>;
  updateSector: (
    id: number,
    data: Omit<Sector, "id" | "created_at">
  ) => Promise<boolean>;
  deleteSector: (id: number) => Promise<boolean>;
  fetchProductionLines: () => Promise<void>; // ✅ Adicionado para buscar linhas disponíveis
  availableProductionLines: ProductionLine[]; // ✅ Adicionado para armazenar linhas disponíveis
}

export const useSectorsStore = create<SectorsState>((set) => ({
  sectors: [],
  loading: false,
  availableProductionLines: [], // ✅ Inicializa a lista de linhas disponíveis

  // Buscar setores da API
  fetchSectors: async () => {
    set({ loading: true });
    try {
      const response = await getSectors();
      set({ sectors: response || [] });
    } catch (error) {
      console.error("Erro ao buscar setores:", error);
      message.error("Erro ao carregar os setores!");
    } finally {
      set({ loading: false });
    }
  },

  // Criar setor
  createSector: async (data) => {
    try {
      const newSector = await createSector(data);
      if (!newSector?.id)
        throw new Error("ID do setor não foi retornado pela API.");

      set((state) => ({
        sectors: [...state.sectors, newSector],
      }));

      // ✅ Atualiza a lista de linhas disponíveis após a criação do setor
      await useSectorsStore.getState().fetchProductionLines();

      return newSector;
    } catch (error) {
      console.error("Erro ao cadastrar setor:", error);
      message.error("Erro ao cadastrar setor!");
      return null;
    }
  },

  // Atualizar setor
  updateSector: async (id, data) => {
    if (!id) {
      message.error("ID inválido para atualização!");
      return false;
    }

    try {
      await updateSector(id, data);
      set((state) => ({
        sectors: state.sectors.map((sector) =>
          sector.id === id ? { ...sector, ...data } : sector
        ),
      }));
      message.success("Setor atualizado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar setor:", error);
      message.error("Erro ao atualizar setor!");
      return false;
    }
  },

  // Buscar linhas de produção disponíveis (não associadas a setores)
  fetchProductionLines: async () => {
    set({ loading: true });
    try {
      const data = await getProductionLines();
      const filteredLines = data.filter((line: ProductionLine) => !line.setor); // ✅ Filtra apenas linhas sem setor
      set({ availableProductionLines: filteredLines });
    } catch (error) {
      console.error("Erro ao buscar linhas de produção:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Excluir setor
  deleteSector: async (id) => {
    if (!id) {
      message.error("ID inválido para exclusão!");
      return false;
    }

    try {
      await deleteSector(id);
      set((state) => ({
        sectors: state.sectors.filter((sector) => sector.id !== id),
      }));

      // ✅ Atualiza a lista de linhas disponíveis após exclusão do setor
      await useSectorsStore.getState().fetchProductionLines();

      message.success("Setor excluído com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao excluir setor:", error);
      message.error("Erro ao excluir setor!");
      return false;
    }
  },
}));
