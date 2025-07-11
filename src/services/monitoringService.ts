// src/services/monitoringService.ts

import api from "./api";
import { MonitoringItem } from "../types/monitoringTypes";

// 🔹 Buscar todos os monitoramentos
export const fetchMonitorings = async (): Promise<MonitoringItem[]> => {
  const response = await api.get<MonitoringItem[]>("/monitorings/");
  return response.data;
};

// 🔹 Buscar monitoramento por ID
export const fetchMonitoringById = async (
  id: number
): Promise<MonitoringItem> => {
  const response = await api.get<MonitoringItem>(`/monitorings/${id}/`);
  return response.data;
};

// 🔹 Contar monitoramentos ativos
export const fetchActiveMonitoringCount = async (): Promise<number> => {
  const response = await api.get<number>("/monitoring-active-count/");
  return response.data;
};

// 🔹 Criar monitoramento (NANSENic)
export const createMonitoring = async (
  data: Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">
): Promise<MonitoringItem> => {
  const payload = {
    ...data,
    type_mmonitoring: "Nansenic" as const,
  };
  const response = await api.post<MonitoringItem>("/monitorings/", payload);
  return response.data;
};

// 🔹 Atualizar monitoramento (mantém type_mmonitoring)
export const updateMonitoring = async (
  id: number,
  data: Partial<Omit<MonitoringItem, "id" | "created_at" | "type_mmonitoring">>
): Promise<MonitoringItem> => {
  const response = await api.put<MonitoringItem>(`/monitorings/${id}/`, data);
  return response.data;
};

// 🔹 Excluir monitoramento
export const deleteMonitoring = async (id: number): Promise<void> => {
  await api.delete(`/monitorings/${id}/`);
};
