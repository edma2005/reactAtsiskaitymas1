import { BASE_URL } from "./questionsApi";
import axios from "axios";

const ANSWERS = `${BASE_URL}/answers/`;

export const postAnswer = (post, x) => {
  return axios.post(`${BASE_URL}/questions/${x}/answers`, post).then((response) => response.data);
};

export const deleteAnswer = (id) => {
  return axios.delete(`${ANSWERS}${id}`).then((response) => response.data);
};

export const patchAnswer = (id, post) => {
  return axios.patch(`${ANSWERS}${id}`, post).then((response) => response.data);
};
