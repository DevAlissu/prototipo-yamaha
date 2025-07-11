import api from "./api";
import { ProductionLine, ProductionLineCreate } from "../types/ProductionLinesTypes";

// 🔹 Buscar todas as linhas de produção
export const getProductionLines = async (): Promise<ProductionLine[]> => {
  try {
    const response = await api.get<ProductionLine[]>("/production_lines/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar linhas de produção:", error);
    throw error;
  }
};

// 🔹 Buscar uma linha de produção pelo ID
export const getProductionLineById = async (id: number): Promise<ProductionLine> => {
  try {
    const response = await api.get<ProductionLine>(`/production_lines/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar a linha de produção com ID ${id}:`, error);
    throw error;
  }
};

// 🔹 Criar uma nova linha de produção
export const createProductionLine = async (data: ProductionLineCreate): Promise<ProductionLine> => {
  try {
    const response = await api.post<ProductionLine>("/production_lines/", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar linha de produção:", error);
    throw error;
  }
};

// 🔹 Atualizar uma linha de produção existente
export const updateProductionLine = async (id: number, data: ProductionLineCreate): Promise<ProductionLine> => {
  try {
    const response = await api.put<ProductionLine>(`/production_lines/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar a linha de produção com ID ${id}:`, error);
    throw error;
  }
};

// 🔹 Deletar uma linha de produção
export const deleteProductionLine = async (id: number): Promise<void> => {
  try {
    await api.delete(`/production_lines/${id}/`);
  } catch (error) {
    console.error(`Erro ao deletar a linha de produção com ID ${id}:`, error);
    throw error;
  }
};