// src/services/parametersMonitoringService.ts

import api from "./api";
import {
  ParametersMonitoringItem,
  ParametersMonitoringCreate,
} from "../types/parametersMonitoring";

// Busca parâmetros por seção (retorna o primeiro encontrado ou null)
export const getParametersBySection = async (
  sectionId: number
): Promise<ParametersMonitoringItem | null> => {
  const response = await api.get<ParametersMonitoringItem[]>(
    `/parameters_monitoring/?section=${sectionId}`
  );
  const items = response.data;
  return items.length > 0 ? items[0] : null;
};

// Cria novos parâmetros para uma seção
export const createParameters = async (
  data: ParametersMonitoringCreate
): Promise<ParametersMonitoringItem> => {
  const response = await api.post<ParametersMonitoringItem>(
    "/parameters_monitoring/",
    data
  );
  return response.data;
};

// Atualiza parâmetros existentes pelo ID
export const updateParameters = async (
  id: number,
  data: ParametersMonitoringCreate
): Promise<ParametersMonitoringItem> => {
  const response = await api.put<ParametersMonitoringItem>(
    `/parameters_monitoring/${id}/`,
    data
  );
  return response.data;
};
