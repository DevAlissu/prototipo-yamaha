import { create } from "zustand";
import api from "../services/api";

// Defina o tipo básico do Quiz (ajuste conforme seu backend)
export interface QuizItem {
  id: number;
  name: string;
  // Adicione outros campos relevantes do seu modelo de quiz, se houver
}

interface QuizStore {
  quizzes: QuizItem[];
  fetchQuizzes: () => Promise<void>;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  fetchQuizzes: async () => {
    try {
      const response = await api.get<QuizItem[]>("/quizzes/");
      set({ quizzes: response.data });
    } catch (error) {
      console.error("Erro ao buscar quizzes", error);
      set({ quizzes: [] }); // Garante estado consistente mesmo em erro
    }
  },
}));
