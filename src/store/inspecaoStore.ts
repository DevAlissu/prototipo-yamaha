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

// Dados mockados iniciais
const mockInspecoes: Inspecao[] = [
  {
    id: 1,
    periodo: "25/08/2025 08:30",
    modeloMoto: "Yamaha Factor 125",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM001",
    lida: true
  },
  {
    id: 2,
    periodo: "25/08/2025 09:15",
    modeloMoto: "Yamaha NMAX 160",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM002",
    lida: false
  },
  {
    id: 3,
    periodo: "25/08/2025 10:00",
    modeloMoto: "Yamaha MT-03",
    resultado: "Ruído de Aperto",
    msimCodigo: "MSIM003",
    lida: false
  },
  {
    id: 4,
    periodo: "25/08/2025 10:45",
    modeloMoto: "Yamaha PCX 150",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM004",
    lida: true
  },
  {
    id: 5,
    periodo: "25/08/2025 11:30",
    modeloMoto: "Yamaha XTZ 250",
    resultado: "Ruído de folga",
    msimCodigo: "MSIM005",
    lida: false
  },
  {
    id: 6,
    periodo: "25/08/2025 14:00",
    modeloMoto: "Yamaha R3",
    resultado: "Motocicleta com ruído aceitável",
    msimCodigo: "MSIM001",
    lida: true
  },
  {
    id: 7,
    periodo: "25/08/2025 14:45",
    modeloMoto: "Yamaha FZ25",
    resultado: "Ruído de válvula",
    msimCodigo: "MSIM002",
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
    nome: "Sensor IA PCX",
    modeloIA: "Yamaha PCX 150",
    codigo: "MSIM004",
    ativo: false
  },
  {
    id: 5,
    nome: "Sensor IA XTZ",
    modeloIA: "Yamaha XTZ 250",
    codigo: "MSIM005",
    ativo: true
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
    const updatedInspecoes = state.inspecoes.map(i => 
      i.id === id ? { ...i, lida: true } : i
    );
    localStorage.setItem('inspecoes', JSON.stringify(updatedInspecoes));
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