import api from "./api";
import { SectionItem as SubsectionItem } from "../types/sections";

// Buscar todas as subseções
export const getSubsections = async (): Promise<SubsectionItem[]> => {
  const response = await api.get("/sub_sections/");
  return response.data;
};

// Buscar uma subseção específica
export const getSubsectionById = async (id: number): Promise<SubsectionItem> => {
  const response = await api.get(`/sub_sections/${id}/`);
  return response.data;
};

// Criar uma nova subseção
export const createSubsection = async (subsection: Partial<SubsectionItem>): Promise<void> => {
  await api.post("/sub_sections/", subsection);
};

// Atualizar uma subseção (PUT)
export const updateSubsection = async (id: number, subsection: Partial<SubsectionItem>): Promise<void> => {
  await api.put(`/sub_sections/${id}/`, subsection);
};

// Excluir uma subseção
export const deleteSubsection = async (id: number): Promise<void> => {
  await api.delete(`/sub_sections/${id}/`);
};