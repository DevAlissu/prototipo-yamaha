import api from "../services/api"; 
import { QuizItem } from "../types/quizzes";

// 🔹 Listar todos os quizzes
export const getQuizzes = async (): Promise<QuizItem[]> => {
  const response = await api.get("/quizzes/");
  return response.data;
};

// 🔹 Criar um novo quiz
export const createQuiz = async (quizData: Partial<QuizItem>) => {
  return await api.post("/quizz/create/", quizData);
};

// 🔹 Atualizar um quiz existente
export const updateQuiz = async (id: number, quizData: Partial<QuizItem>) => {
  const response = await api.put(`/quizzes/${id}/`, quizData);
  return response.data;
};

// 🔹 Deletar um quiz
export const deleteQuiz = async (id: number) => {
  await api.delete(`/quizs/${id}/`);
};
