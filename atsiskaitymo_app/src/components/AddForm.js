import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

const initialValues = {
  title: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const onSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    const API_URL =
      "https://autumn-delicate-wilderness.glitch.me/v1/content/skills";

    const API_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MCwiZW1haWwiOiJlZG1hQGVkbWExLmx0IiwiaWF0IjoxNjgwMDE2MjE5fQ.kpmYxY1nltPX9KRKisZLnt6E06oywMQ2qonl_GkN63o";

    const config = {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    };

    const response = await axios.post(API_URL, values, config);
    console.log(response.data);

    resetForm();
  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};

function App() {
  return (
    <div>
      <h1>Add Data to the API</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <FormContainer>
            <Form>
              <FormGroup>
                <label htmlFor="title">Title</label>
                <Field type="text" name="title" id="title" />
                <ErrorMessage name="title" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="description">Description</label>
                <Field as="textarea" name="description" id="description" />
                <ErrorMessage name="description" />
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
}

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

export default App;
