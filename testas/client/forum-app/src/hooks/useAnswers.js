import { deleteAnswer, postAnswer } from "../api/answersApi";

import { useMutation } from "@tanstack/react-query";

const ANSWER = "ANSWER";

export const usePostAnswer = (id, post) => {
  return useMutation([ANSWER], () => postAnswer(id, post));
};

export const useDeleteAnswer = () => {
  return useMutation(deleteAnswer);
};
