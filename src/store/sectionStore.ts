import { create } from "zustand";
import { SectionItem } from "@/types/sections";
import api from "@/services/api";

interface SectionState {
  sections: SectionItem[];
  loading: boolean;
  fetchSections: () => Promise<void>;
  addSection: (data: Partial<SectionItem>) => Promise<void>;
  updateSection: (id: number, data: Partial<SectionItem>) => Promise<void>;
  deleteSection: (id: number) => Promise<void>;
}

// Função auxiliar para tratar erros do Axios
function isAxiosError(error: unknown): error is { response: { data: any } } {
  return typeof error === "object" && error !== null && "response" in error;
}

// Função utilitária: remove description se vier nula ou string vazia
function removeEmptyDescription<T extends { description?: string | null }>(
  data: T
): T {
  if (
    data.description === "" ||
    data.description === null ||
    data.description === undefined
  ) {
    const { description, ...rest } = data;
    return rest as T;
  }
  return data;
}

export const useSectionStore = create<SectionState>((set, get) => ({
  sections: [],
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const response = await api.get<SectionItem[]>("/sections/");
      const allSections = response.data;

      const normalizedSections = allSections.map((section) => ({
        ...section,
        device_iots: Array.isArray(section.device_iots)
          ? section.device_iots
          : section.device_iots !== undefined
          ? [section.device_iots]
          : [],
        sections_filhas: [],
      }));

      const sectionMap: Record<number, SectionItem> = {};
      normalizedSections.forEach((section) => {
        sectionMap[section.id] = section;
      });

      const rootSections: SectionItem[] = [];
      normalizedSections.forEach((section) => {
        if (section.secticon_parent) {
          const parent = sectionMap[section.secticon_parent];
          if (parent) {
            parent.sections_filhas?.push(section);
          }
        } else {
          rootSections.push(section);
        }
      });

      set({ sections: rootSections });
      console.log("✅ Seções carregadas com hierarquia:", rootSections);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao buscar seções:", error.response.data);
      } else {
        console.error("❌ Erro ao buscar seções:", String(error));
      }
    } finally {
      set({ loading: false });
    }
  },

  addSection: async (data) => {
    try {
      if (!data.type_section || typeof data.type_section !== "number") {
        throw new Error("`type_section` deve ser um ID numérico.");
      }
      if (data.device_iots && !Array.isArray(data.device_iots)) {
        data.device_iots = [data.device_iots as any];
      }
      // Se for string vazia, nem manda description
      const cleanData = removeEmptyDescription(data);
      const response = await api.post("/sections/", cleanData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Seção criada:", response.data);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao adicionar seção:", error.response.data);
      } else {
        console.error("❌ Erro ao adicionar seção:", String(error));
      }
    }
  },

  updateSection: async (id, data) => {
    try {
      // Nunca force description em patch!
      if (data.device_iots && !Array.isArray(data.device_iots)) {
        data.device_iots = [data.device_iots as any];
      }
      // Se description vier vazia, não manda!
      const cleanData = removeEmptyDescription(data);
      const response = await api.patch(`/sections/${id}/`, cleanData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(`✅ Seção ${id} atualizada com sucesso:`, response.data);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao atualizar seção:", error.response.data);
      } else {
        console.error("❌ Erro ao atualizar seção:", String(error));
      }
    }
  },

  deleteSection: async (id) => {
    try {
      await api.delete(`/sections/${id}/`);
      console.log(`🗑️ Seção ${id} excluída.`);
      await get().fetchSections();
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("❌ Erro ao excluir seção:", error.response.data);
      } else {
        console.error("❌ Erro ao excluir seção:", String(error));
      }
    }
  },
}));
