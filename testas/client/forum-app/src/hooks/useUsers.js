import { getUser, loginUser, registerUser } from "../api/usersApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const USER = "USER";

export const useRegisterUser = () => {
  return useMutation(registerUser);
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};

export const useGetUser = (id) => {
  return useQuery([USER], () => getUser(id));
};
