import { create } from "zustand";
import { QuizItem } from "../types/quizzes";
import { getQuizzes, createQuiz as createQuizAPI, updateQuiz as updateQuizAPI, deleteQuiz as deleteQuizAPI } from "../services/QuizService";

interface QuizStore {
  quizzes: QuizItem[];
  fetchQuizzes: () => Promise<void>;
  createQuiz: (quizData: Partial<QuizItem>) => Promise<void>;
  updateQuiz: (id: number, quizData: Partial<QuizItem>) => Promise<void>;
  deleteQuiz: (id: number) => Promise<void>;
  getQuizById: (id: number) => Promise<QuizItem | null>;

}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],

  fetchQuizzes: async () => {
    try {
      const data = await getQuizzes();
      set({ quizzes: data });
    } catch (error) {
      console.error("Erro ao buscar quizzes", error);
    }
  },

  createQuiz: async (quizData) => {
    try {
      const response = await createQuizAPI(quizData);
      set((state) => ({
        quizzes: [...state.quizzes, response.data],
      }));
    } catch (error) {
      console.error("Erro ao criar quizz", error);
    }
  },

  updateQuiz: async (id, quizData) => {
    try {
      const updatedQuiz = await updateQuizAPI(id, quizData);
      set((state) => ({
        quizzes: state.quizzes.map((quiz) => (quiz.id === id ? updatedQuiz : quiz)),
      }));
    } catch (error) {
      console.error("Erro ao atualizar quizz", error);
    }
  },

 getQuizById: async (id: number): Promise<QuizItem | null> => {
    const quizzes = useQuizStore.getState().quizzes;
    const quiz = quizzes.find((quiz) => quiz.id === id);
    return quiz || null;
},

  deleteQuiz: async (id) => {
    try {
      await deleteQuizAPI(id);
      set((state) => ({
        quizzes: state.quizzes.filter((quiz) => quiz.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir quizz", error);
    }
  },
}));