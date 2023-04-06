import { Field, Formik } from "formik";
import { StyledForm, StyledTextArea, Title, Wrapper } from "./styles";
import {
  addFormInitialValues,
  addValidationSchema,
} from "../../const/formikValidations";

import FormikInput from "../../components/formikInput/FormikInput";
import { HOME_PATH } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { useContext } from "react";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useGetUser } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { usePostQuestion } from "../../hooks/useQuestions";

const AddPost = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserContext);
  const { refetch: userRefetch } = useGetUser(userObject._id);
  const { refetch } = useGetQuestions();
  const { mutateAsync: postQuestion } = usePostQuestion();
  const handleSubmit = async (post) => {
    const question = {
      user_id: userObject._id,
      title: post.title,
      question: post.question,
    };
    try {
      await postQuestion(question);
      toast.success("Post have been added");
      await refetch();
      await userRefetch(userObject._id);
      navigate(HOME_PATH);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Wrapper>
      <Formik
        initialValues={addFormInitialValues}
        onSubmit={handleSubmit}
        validationSchema={addValidationSchema}
      >
        <StyledForm>
          <Title>Add question</Title>
          <FormikInput name="title" type="text" placeholder="Title" />
          <Field
            name="question"
            as={StyledTextArea}
            placeholder="Write your question here ..."
          />
          <button type="submit">Submit your question</button>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};

export default AddPost;
