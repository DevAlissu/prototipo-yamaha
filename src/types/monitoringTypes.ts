// src/types/monitoringTypes.ts

export interface MonitoringItem {
  id: number;
  name: string;
  description: string;
  estimated_consumption: number;
  created_at: string;
  type_mmonitoring: "Nansenic" | "Nansenson" | "NANSENsor";
}
