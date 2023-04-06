import * as Yup from "yup";

export const addFormInitialValues = {
  title: "",
  question: "",
};

export const addValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  question: Yup.string().required("Required"),
});

export const answerFormInitialValues = {
  answer: "",
};

export const answerValidationSchema = Yup.object().shape({
  answer: Yup.string().required("Required"),
});

export const loginFormInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email should contain @").required("Required"),
  password: Yup.string().required("Required"),
});

export const registerFormInitialValues = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Email should contain @").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});
