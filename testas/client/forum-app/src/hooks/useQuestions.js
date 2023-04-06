import { deleteQuestion, fetchQuestions, patchQuestion, postQuestion } from "../api/questionsApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const QUESTIONS = "QUESTIONS_DATA";

export const useGetQuestions = () => {
  return useQuery([QUESTIONS], () => {
    return fetchQuestions();
  });
};

export const usePostQuestion = () => {
  return useMutation(postQuestion);
};

export const useDeleteQuestion = () => {
  return useMutation(deleteQuestion);
};

export const usePatchQuestion = () => {
  return useMutation(patchQuestion);
};
