import api from "./api";

// Buscar todas as seções
export const getSections = async (): Promise<any[]> => {
  const response = await api.get("/sections/");
  return response.data;
};

// Buscar uma seção específica
export const getSectionById = async (id: number): Promise<any> => {
  const response = await api.get(`/sections/${id}/`);
  return response.data;
};

// Criar uma nova seção
export const createSection = async (section: Partial<any>): Promise<void> => {
  await api.post("/sections/", section);
};

// Atualizar uma seção (PUT)
export const updateSection = async (
  id: number,
  section: Partial<any>
): Promise<void> => {
  const response = await api.patch(`/sections/${id}/`, section);
  return response.data;
};

// Excluir uma seção
export const deleteSection = async (id: number): Promise<void> => {
  await api.delete(`/sections/${id}/`);
};

// Buscar tipos de seção (SETOR, LINHA, EQUIPAMENTO)
export const getTypeSections = async (): Promise<
  { id: number; name: string }[]
> => {
  const response = await api.get("/typesection/");
  return response.data;
};

// Buscar medições de energia para uma seção
// Use hífen ASCII normal (U+002D) em "section-measurements"
export async function getSectionMeasurements(
  sectionId: number
): Promise<{ interval: number; energia_ativa_kWh: number }[]> {
  const { data } = await api.get(
    `/section-measurements/?section_id=${sectionId}`
  );
  return data;
}
