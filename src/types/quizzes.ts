export interface QuizItem {
  id: number;
  name: string;
  description: string;
  questions: {
    text: string;
    responses: {
      text: string;
      is_correct: boolean;
    }[];
  }[];
}