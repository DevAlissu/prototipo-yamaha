export type ResultadoInspecao = 
  | "Motocicleta com ruído aceitável"
  | "Ruído de válvula"
  | "Ruído de Aperto"
  | "Ruído de folga";

export interface Inspecao {
  id: number;
  periodo: string; // formato: "DD/MM/YYYY HH:mm"
  modeloMoto: string;
  resultado: ResultadoInspecao;
  msimCodigo: string;
  lida?: boolean; // para marcar como lida no dashboard
}

export interface MSIM {
  id: number;
  nome: string;
  modeloIA: string; // modelos das motos
  codigo: string;
  ativo?: boolean;
}