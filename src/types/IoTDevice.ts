// src/types/IoTDevice.ts

export interface IoTDevice {
  id: number;
  name: string;
  devEui: string | null;
  type_device: "Nansenic" | "Nansenson" | null;
  equipement?: number | null;
  is_available?: boolean; // Indica se o dispositivo está disponível (não ocupado)
}
