import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

const RegisterForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        "https://autumn-delicate-wilderness.glitch.me/v1/auth/register",
        values
      );
      console.log(response.data);
      alert("Registration successful");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <FormContainer>
            <Form>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" />
              </FormGroup>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </SubmitButton>
            </Form>
          </FormContainer>
        )}
      </Formik>
    </div>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
  }

  textarea {
    height: 100px;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0069d9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default RegisterForm;
