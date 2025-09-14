import { create } from 'zustand';
import { Inspecao, MSIM, ResultadoInspecao } from '../types/inspecao';

interface InspecaoStore {
  inspecoes: Inspecao[];
  msims: MSIM[];
  loading: boolean;
  
  // Inspeções
  addInspecao: (inspecao: Omit<Inspecao, 'id'>) => void;
  updateInspecao: (id: number, inspecao: Partial<Inspecao>) => void;
  deleteInspecao: (id: number) => void;
  marcarComoLida: (id: number) => void;
  getInspecoesFalhas: () => Inspecao[];
  
  // MSIM
  addMSIM: (msim: Omit<MSIM, 'id'>) => void;
  updateMSIM: (id: number, msim: Partial<MSIM>) => void;
  deleteMSIM: (id: number) => void;
  getMSIMAtivos: () => MSIM[];
  
  // Métricas
  getTotalInspecionadas: () => number;
  getTotalFalhas: () => number;
  getTotalMSIMAtivos: () => number;
  
  // Init
  initializeData: () => void;
}

// Dados mockados iniciais - 10 falhas + proporcionais com sucesso
const mockInspecoes: Inspecao[] = [
  // Falhas (10 inspeções com problemas)
  {
    id: 1,
    periodo: "26/08/2025 08:00",
    modeloMoto: "Yamaha NMAX 160",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 2,
    periodo: "26/08/2025 08:30",
    modeloMoto: "Yamaha MT-03",
    resultado: "Ruído de Aperto",
    msimCodigo: "MSIM003",
    lida: false
  },
  {
    id: 3,
    periodo: "26/08/2025 09:00",
    modeloMoto: "Yamaha XTZ 250",
    resultado: "Ruído de folga",
    msimCodigo: "MSIM005",
    lida: false
  },
  {
    id: 4,
    periodo: "26/08/2025 09:30",
    modeloMoto: "Yamaha FZ25",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 5,
    periodo: "26/08/2025 10:00",
    modeloMoto: "Yamaha Factor 125",
    resultado: "Ruído de Aperto",
    msimCodigo: "MSIM001",
    lida: false
  },
  {
    id: 6,
    periodo: "26/08/2025 10:30",
    modeloMoto: "Yamaha R3",
    resultado: "Ruído de folga",
    msimCodigo: "MSIM001",
    lida: false
  },
  {
    id: 7,
    periodo: "26/08/2025 11:00",
    modeloMoto: "Yamaha Aerox 155",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM004",
    lida: false
  },
  {
    id: 8,
    periodo: "26/08/2025 11:30",
    modeloMoto: "Yamaha YBR 125",
    resultado: "Ruído de Aperto",
    msimCodigo: "MSIM006",
    lida: false
  },
  {
    id: 9,
    periodo: "26/08/2025 12:00",
    modeloMoto: "Yamaha Fazer 250",
    resultado: "Ruído de folga",
    msimCodigo: "MSIM007",
    lida: false
  },
  {
    id: 10,
    periodo: "26/08/2025 12:30",
    modeloMoto: "Yamaha Crosser 150",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM008",
    lida: false
  },
  // Sucessos (15 inspeções sem problemas - proporcional)
  {
    id: 11,
    periodo: "26/08/2025 13:00",
    modeloMoto: "Yamaha Factor 125",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM001",
    lida: false
  },
  {
    id: 12,
    periodo: "26/08/2025 13:30",
    modeloMoto: "Yamaha NMAX 160",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 13,
    periodo: "26/08/2025 14:00",
    modeloMoto: "Yamaha MT-03",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM003",
    lida: false
  },
  {
    id: 14,
    periodo: "26/08/2025 14:30",
    modeloMoto: "Yamaha Aerox 155",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM004",
    lida: false
  },
  {
    id: 15,
    periodo: "26/08/2025 15:00",
    modeloMoto: "Yamaha XTZ 250",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM005",
    lida: false
  },
  {
    id: 16,
    periodo: "26/08/2025 15:30",
    modeloMoto: "Yamaha R3",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM001",
    lida: false
  },
  {
    id: 17,
    periodo: "26/08/2025 16:00",
    modeloMoto: "Yamaha FZ25",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 18,
    periodo: "26/08/2025 16:30",
    modeloMoto: "Yamaha YBR 125",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM006",
    lida: false
  },
  {
    id: 19,
    periodo: "26/08/2025 17:00",
    modeloMoto: "Yamaha Fazer 250",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM007",
    lida: false
  },
  {
    id: 20,
    periodo: "26/08/2025 17:30",
    modeloMoto: "Yamaha Crosser 150",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM008",
    lida: false
  },
  {
    id: 21,
    periodo: "25/08/2025 08:00",
    modeloMoto: "Yamaha Factor 125",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM001",
    lida: false
  },
  {
    id: 22,
    periodo: "25/08/2025 09:00",
    modeloMoto: "Yamaha NMAX 160",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 23,
    periodo: "25/08/2025 10:00",
    modeloMoto: "Yamaha MT-03",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM003",
    lida: false
  },
  {
    id: 24,
    periodo: "25/08/2025 11:00",
    modeloMoto: "Yamaha Aerox 155",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM004",
    lida: false
  },
  {
    id: 25,
    periodo: "25/08/2025 14:00",
    modeloMoto: "Yamaha XTZ 250",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM005",
    lida: false
  }
];

const mockMSIMs: MSIM[] = [
  {
    id: 1,
    nome: "Sensor IA Yamaha v1",
    modeloIA: "Yamaha Factor 125, Yamaha R3",
    codigo: "MSIM001",
    ativo: true
  },
  {
    id: 2,
    nome: "Sensor IA Yamaha v2",
    modeloIA: "Yamaha NMAX 160, Yamaha FZ25",
    codigo: "MSIM002",
    ativo: true
  },
  {
    id: 3,
    nome: "Sensor IA Yamaha Pro",
    modeloIA: "Yamaha MT-03",
    codigo: "MSIM003",
    ativo: true
  },
  {
    id: 4,
    nome: "Sensor IA Aerox",
    modeloIA: "Yamaha Aerox 155",
    codigo: "MSIM004",
    ativo: true
  },
  {
    id: 5,
    nome: "Sensor IA XTZ",
    modeloIA: "Yamaha XTZ 250",
    codigo: "MSIM005",
    ativo: true
  },
  {
    id: 6,
    nome: "Sensor IA YBR",
    modeloIA: "Yamaha YBR 125",
    codigo: "MSIM006",
    ativo: true
  },
  {
    id: 7,
    nome: "Sensor IA Fazer",
    modeloIA: "Yamaha Fazer 250",
    codigo: "MSIM007",
    ativo: true
  },
  {
    id: 8,
    nome: "Sensor IA Crosser",
    modeloIA: "Yamaha Crosser 150",
    codigo: "MSIM008",
    ativo: false
  }
];

export const useInspecaoStore = create<InspecaoStore>((set, get) => ({
  inspecoes: [],
  msims: [],
  loading: false,
  
  // Inspeções
  addInspecao: (inspecao) => set((state) => {
    const newInspecao = {
      ...inspecao,
      id: Math.max(0, ...state.inspecoes.map(i => i.id)) + 1,
      lida: false
    };
    const updatedInspecoes = [...state.inspecoes, newInspecao];
    localStorage.setItem('inspecoes', JSON.stringify(updatedInspecoes));
    return { inspecoes: updatedInspecoes };
  }),
  
  updateInspecao: (id, inspecao) => set((state) => {
    const updatedInspecoes = state.inspecoes.map(i => 
      i.id === id ? { ...i, ...inspecao } : i
    );
    localStorage.setItem('inspecoes', JSON.stringify(updatedInspecoes));
    return { inspecoes: updatedInspecoes };
  }),
  
  deleteInspecao: (id) => set((state) => {
    const updatedInspecoes = state.inspecoes.filter(i => i.id !== id);
    localStorage.setItem('inspecoes', JSON.stringify(updatedInspecoes));
    return { inspecoes: updatedInspecoes };
  }),
  
  marcarComoLida: (id) => set((state) => {
    // Atualiza apenas no estado, não persiste no localStorage
    // Para que ao recarregar a página, as falhas voltem a aparecer
    const updatedInspecoes = state.inspecoes.map(i => 
      i.id === id ? { ...i, lida: true } : i
    );
    return { inspecoes: updatedInspecoes };
  }),
  
  getInspecoesFalhas: () => {
    const { inspecoes } = get();
    return inspecoes.filter(i => i.resultado !== "Motocicleta com ruído aceitável");
  },
  
  // MSIM
  addMSIM: (msim) => set((state) => {
    const newMSIM = {
      ...msim,
      id: Math.max(0, ...state.msims.map(m => m.id)) + 1,
      ativo: true
    };
    const updatedMSIMs = [...state.msims, newMSIM];
    localStorage.setItem('msims', JSON.stringify(updatedMSIMs));
    return { msims: updatedMSIMs };
  }),
  
  updateMSIM: (id, msim) => set((state) => {
    const updatedMSIMs = state.msims.map(m => 
      m.id === id ? { ...m, ...msim } : m
    );
    localStorage.setItem('msims', JSON.stringify(updatedMSIMs));
    return { msims: updatedMSIMs };
  }),
  
  deleteMSIM: (id) => set((state) => {
    const updatedMSIMs = state.msims.filter(m => m.id !== id);
    localStorage.setItem('msims', JSON.stringify(updatedMSIMs));
    return { msims: updatedMSIMs };
  }),
  
  getMSIMAtivos: () => {
    const { msims } = get();
    return msims.filter(m => m.ativo);
  },
  
  // Métricas
  getTotalInspecionadas: () => {
    const { inspecoes } = get();
    return inspecoes.length;
  },
  
  getTotalFalhas: () => {
    const { inspecoes } = get();
    return inspecoes.filter(i => i.resultado !== "Motocicleta com ruído aceitável").length;
  },
  
  getTotalMSIMAtivos: () => {
    const { msims } = get();
    return msims.filter(m => m.ativo).length;
  },
  
  // Init
  initializeData: () => {
    const savedInspecoes = localStorage.getItem('inspecoes');
    const savedMSIMs = localStorage.getItem('msims');
    
    if (savedInspecoes) {
      set({ inspecoes: JSON.parse(savedInspecoes) });
    } else {
      localStorage.setItem('inspecoes', JSON.stringify(mockInspecoes));
      set({ inspecoes: mockInspecoes });
    }
    
    if (savedMSIMs) {
      set({ msims: JSON.parse(savedMSIMs) });
    } else {
      localStorage.setItem('msims', JSON.stringify(mockMSIMs));
      set({ msims: mockMSIMs });
    }
  }
}));