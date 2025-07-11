// src/services/IoTDevicesService.ts

import api from "./api";
import { IoTDevice } from "../types/IoTDevice";

// Buscar todos os dispositivos IoT
export const getIoTDevices = async (): Promise<IoTDevice[]> => {
  const response = await api.get<IoTDevice[]>("/device_iots/");
  return response.data;
};

// Buscar um dispositivo IoT específico
export const getIoTDeviceById = async (id: number): Promise<IoTDevice> => {
  const response = await api.get<IoTDevice>(`/device_iots/${id}/`);
  return response.data;
};

// Criar um novo dispositivo IoT
export const createIoTDevice = async (device: {
  name: string;
  devEui: string;
  type_device: "Nansenic" | "Nansenson";
  equipement?: number | null;
}): Promise<IoTDevice> => {
  const response = await api.post<IoTDevice>("/device_iots/", device);
  return response.data;
};

// Atualizar um dispositivo IoT (PUT)
export const updateIoTDevice = async (
  id: number,
  device: {
    name: string;
    devEui: string;
    type_device: "Nansenic" | "Nansenson";
    equipement?: number | null;
  }
): Promise<IoTDevice> => {
  const response = await api.put<IoTDevice>(`/device_iots/${id}/`, device);
  return response.data;
};

// Atualizar parcialmente um dispositivo IoT (PATCH)
export const patchIoTDevice = async (
  id: number,
  device: Partial<IoTDevice>
): Promise<void> => {
  await api.patch(`/device_iots/${id}/`, device);
};

// Excluir um dispositivo IoT
export const deleteIoTDevice = async (id: number): Promise<void> => {
  await api.delete(`/device_iots/${id}/`);
};
