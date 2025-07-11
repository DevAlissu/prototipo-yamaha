import { create } from "zustand";
import api from "@/services/api";

export interface TypeSection {
  id: number;
  name: "SETOR" | "LINHA" | "EQUIPAMENTO";
}

interface TypeSectionState {
  types: TypeSection[];
  loading: boolean;
  fetchTypes: () => Promise<void>;
  getTypeIdByName: (name: TypeSection["name"]) => number | null;
}

export const useTypeSectionStore = create<TypeSectionState>((set, get) => ({
  types: [],
  loading: false,

  fetchTypes: async () => {
    set({ loading: true });
    try {
      const response = await api.get<TypeSection[]>("/type_sections/"); // ✅ URL corrigida
      set({ types: response.data });
      console.log("📦 Tipos de seção carregados:", response.data);
    } catch (error: any) {
      console.error("❌ Erro ao buscar tipos de seção:", error?.response?.data || error);
    } finally {
      set({ loading: false });
    }
  },

  getTypeIdByName: (name) => {
    const { types } = get();
    const match = types.find((t) => t.name === name);
    return match ? match.id : null;
  },
}));