import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const POST_QUESTION = `${BASE_URL}/questions`;

export const fetchQuestions = () => {
  return axios.get(POST_QUESTION).then((response) => response.data);
};

export const postQuestion = (post) => {
  return axios.post(POST_QUESTION, post).then((response) => response.data);
};

export const fetchOneQuestion = (id) => {
  return axios.get(`http://localhost:8080/question/${id}`).then((response) => response.data);
};

export const deleteQuestion = (id) => {
  return axios.delete(`${POST_QUESTION}/${id}`).then((response) => response.data);
};

export const patchQuestion = (id, post) => {
  return axios.patch(`${POST_QUESTION}/${id}`, post).then((response) => response.data);
};
