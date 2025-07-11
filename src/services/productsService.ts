import api from "./api";
import { ProductionLine, ProductionLineCreate } from "../types/ProductionLinesTypes";

// 🔹 Listar todas as linhas de produção
export const getProductionLines = async (): Promise<ProductionLine[]> => {
  const response = await api.get<ProductionLine[]>("/production_lines/");
  return response.data;
};

// 🔹 Obter uma linha de produção por ID
export const getProductionLineById = async (id: number): Promise<ProductionLine> => {
  const response = await api.get<ProductionLine>(`/production_lines/${id}/`);
  return response.data;
};

// 🔹 Criar uma nova linha de produção
export const createProductionLine = async (data: ProductionLineCreate): Promise<ProductionLine> => {
  const response = await api.post<ProductionLine>("/production_lines/", data);
  return response.data;
};

// 🔹 Atualizar uma linha de produção existente
export const updateProductionLine = async (id: number, data: ProductionLineCreate): Promise<ProductionLine> => {
  const response = await api.put<ProductionLine>(`/production_lines/${id}/`, data);
  return response.data;
};

// 🔹 Deletar uma linha de produção
export const deleteProductionLine = async (id: number): Promise<void> => {
  await api.delete(`/production_lines/${id}/`);
};