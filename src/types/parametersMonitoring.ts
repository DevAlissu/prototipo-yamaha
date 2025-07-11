// src/types/parametersMonitoring.ts

export interface ParametersMonitoringItem {
  id: number;
  name?: string | null;
  min_temperature: number;
  max_temperature: number;
  min_humidity: number;
  max_humidity: number;
  min_luminosity: number;
  max_luminosity: number;
  section: number; // ID da seção associada
  created_at: string;
  updated_at: string;
}

export interface ParametersMonitoringCreate {
  name?: string | null;
  min_temperature: number;
  max_temperature: number;
  min_humidity: number;
  max_humidity: number;
  min_luminosity: number;
  max_luminosity: number;
  section: number;
}
