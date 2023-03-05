import { create } from "zustand";
import { v4 as UUID } from "uuid";

export const useQuiz = create((set) => ({
  loading: false,
  responseFailed: false,
  phase: 0,
  Questions: [],
  correctAnswers: [],
  userAnswers: [],

  resetAlert: () => set(() => ({ responseFailed: false })),
  setSubmitedAnswers: (recivedAnswer) => {
    set(() => {
      return {
        userAnswers: recivedAnswer,
        phase: 2,
      };
    });
  },
  setPhase: (num) => set(() => ({ phase: num })),

  setTest: async (Choices) => {
    set(() => ({ loading: true }));
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5&type=multiple&category=${Choices?.Cat}&difficulty=${Choices?.Diff}`
    );
    const data = await res.json();
    if (data.response_code === 1) {
      set(() => ({
        responseFailed: true,
        loading: false,
      }));
      return;
    }

    const ModifiedData = data.results.map((data) => {
      if (data.type === "multiple") {
        const answers = [data.correct_answer, ...data.incorrect_answers];
        const shuffledAnswers = [];
        for (let i = 0; i < 4; i++) {
          shuffledAnswers.push({
            id: UUID(),
            answer: answers.splice(
              Math.floor(Math.random() * answers.length),
              1
            )[0],
          });
        }
        return {
          id: UUID(),
          type: "mutiple",
          title: data.question,
          correct: data.correct_answer,
          answers: shuffledAnswers,
        };
      }
      return {
        id: UUID(),
        type: "boolean",
        title: data.question,
        correct: data.correct_answer,
        answers: [
          { id: UUID(), answer: "True" },
          { id: UUID(), answer: "False" },
        ],
      };
    });

    const CorrectAnswers = ModifiedData.map((e) => {
      return {
        id: e.id,
        answer: e.correct,
        type: e.type,
      };
    });
    set(() => {
      return {
        Questions: ModifiedData,
        correctAnswers: CorrectAnswers,
        loading: false,
        phase: 1,
        responseFailed: false,
      };
    });
  },
}));
