import { create } from "zustand";
import { message } from "antd";
import { IoTDevice } from "../types/IoTDevice";
import {
  getIoTDevices,
  getIoTDeviceById,
  createIoTDevice,
  updateIoTDevice,
  deleteIoTDevice,
} from "../services/IoTDevicesService";

interface IoTDevicesState {
  devices: IoTDevice[];
  loading: boolean;
  fetchDevices: () => Promise<void>;
  getDeviceById: (id: number) => Promise<IoTDevice | null>;
  addDevice: (device: Partial<IoTDevice>) => Promise<void>;
  editDevice: (id: number, device: Partial<IoTDevice>) => Promise<void>;
  removeDevice: (id: number) => Promise<void>;
}

export const useIoTDevicesStore = create<IoTDevicesState>((set) => ({
  devices: [],
  loading: false,

  fetchDevices: async () => {
    set({ loading: true });
    try {
      const data = await getIoTDevices();
      set({ devices: data });
    } catch (error) {
      console.error("Erro ao buscar dispositivos IoT:", error);
      message.error("Erro ao carregar dispositivos IoT!");
    } finally {
      set({ loading: false });
    }
  },

  getDeviceById: async (id: number) => {
    try {
      return await getIoTDeviceById(id);
    } catch (error) {
      console.error("Erro ao buscar dispositivo IoT:", error);
      message.error("Erro ao carregar o dispositivo!");
      return null;
    }
  },

  addDevice: async (device: Partial<IoTDevice>) => {
    try {
      await createIoTDevice(device);
      message.success("Dispositivo IoT cadastrado com sucesso!");
      await useIoTDevicesStore.getState().fetchDevices();
    } catch (error) {
      console.error("Erro ao cadastrar dispositivo:", error);
      message.error("Erro ao cadastrar dispositivo!");
    }
  },

  editDevice: async (id: number, device: Partial<IoTDevice>) => {
    try {
      await updateIoTDevice(id, device);
      message.success("Dispositivo IoT atualizado com sucesso!");
      await useIoTDevicesStore.getState().fetchDevices();
    } catch (error) {
      console.error("Erro ao atualizar dispositivo:", error);
      message.error("Erro ao atualizar dispositivo!");
    }
  },

  removeDevice: async (id: number) => {
    try {
      await deleteIoTDevice(id);
      message.success("Dispositivo IoT removido com sucesso!");
      set((state) => ({
        devices: state.devices.filter((device) => device.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir dispositivo:", error);
      message.error("Erro ao excluir dispositivo!");
    }
  },
}));