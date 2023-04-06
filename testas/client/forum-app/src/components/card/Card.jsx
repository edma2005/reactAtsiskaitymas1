import {
  Buttons,
  Delete,
  Like,
  Post,
  PostBotom,
  PostTop,
  StyledButtom,
  StyledForm,
  StyledTextArea,
  Wrapper,
} from "./styles";
import { FaRegThumbsUp, FaThumbsUp, FaWindowClose } from "react-icons/fa";
import { Field, Formik } from "formik";
import { HOME_PATH, LOGIN_PATH, POST_PATH } from "../../routes/consts";
import {
  addValidationSchema,
  answerFormInitialValues,
  answerValidationSchema,
} from "../../const/formikValidations";
import { generatePath, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Answer from "../answers/Answer";
import Button from "../button/Button";
import FormikInput from "../formikInput/FormikInput";
import { UserContext } from "../../contexts/UserContext";
import { patchLikesPostsUser } from "../../api/usersApi";
import { patchQuestion } from "../../api/questionsApi";
import { postAnswer } from "../../api/answersApi";
import { toast } from "react-hot-toast";
import { useDeleteQuestion } from "../../hooks/useQuestions";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useGetUser } from "../../hooks/useUsers";

const Card = ({
  id,
  date,
  title,
  question,
  answers,
  edited = false,
  user_id,
  comment,
}) => {
  const { isLoggedIn, userObject } = useContext(UserContext);
  const { refetch: userRefetch } = useGetUser(userObject._id);
  const [isEditing, setIsEditing] = useState(false);
  const { refetch } = useGetQuestions();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const navigatePath = (id) => {
    const path = generatePath(POST_PATH, { id });
    navigate(path);
  };

  const handleSubmit = async (x) => {
    const { answer } = x;
    const post = {
      answer: answer,
      user_id: userObject._id,
    };
    try {
      await postAnswer(post, id);
      toast.success("You have posted answer");
      navigate(HOME_PATH);
      setShow(false);
      await refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(id);
      toast.success("You have post deleted");
      await refetch();
      await userRefetch(userObject._id);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = async (post) => {
    try {
      await patchQuestion(id, post);
      setIsEditing(false);
      await refetch();
      toast.success("You have edited question");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleLike = async () => {
    const type = { type: "question" };
    // console.log(userObject._id, id, type)
    try {
      await patchLikesPostsUser(userObject._id, id, type);
      toast.success("Liked");
      await userRefetch(userObject._id);
      await refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const isLiked = userObject.liked_posts?.some(
    (post) => post.postId === id && post.type === "question"
  );

  return (
    <Wrapper>
      <Post>
        <PostTop>
          <span>Data Stamp: {date}</span>
          <div>
            {edited ? <span>Edited</span> : <span>Not edited</span>}
            {user_id === userObject._id ? (
              <>
                {isEditing ? (
                  <span>
                    <StyledButtom onClick={() => setIsEditing(false)}>
                      Cancel editing
                    </StyledButtom>
                  </span>
                ) : (
                  <span>
                    <StyledButtom onClick={() => setIsEditing(true)}>
                      Press to edit
                    </StyledButtom>
                    <Delete onClick={handleDelete} />
                  </span>
                )}
              </>
            ) : (
              <>
                {isLoggedIn && (
                  <>
                    {" "}
                    {isLiked ? (
                      <Like onClick={handleLike}>
                        <FaThumbsUp />
                      </Like>
                    ) : (
                      <Like onClick={handleLike}>
                        <FaRegThumbsUp />
                      </Like>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </PostTop>
        <PostBotom>
          {isEditing ? (
            <Formik
              initialValues={{ title, question }}
              onSubmit={handleEdit}
              validationSchema={addValidationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <StyledForm onSubmit={handleSubmit}>
                  <FormikInput
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Title"
                  />
                  {errors.title && touched.title}
                  <StyledTextArea
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Question"
                  />
                  {errors.question && touched.question}
                  <Button isRed type="submit">
                    Save Changes
                  </Button>
                </StyledForm>
              )}
            </Formik>
          ) : (
            <>
              <h3>{title}</h3>
              <p>{question}</p>
            </>
          )}
          <Buttons>
            {isLoggedIn ? (
              <>
                {comment ? (
                  <Button onClick={() => setShow(true)} isRed>
                    Press to comment
                  </Button>
                ) : (
                  <Button onClick={() => navigatePath(id)} isRed>
                    TO QUESTION
                  </Button>
                )}
              </>
            ) : (
              <Button onClick={() => navigate(LOGIN_PATH)}>
                Login for commenting
              </Button>
            )}
          </Buttons>
        </PostBotom>
      </Post>
      {show && (
        <>
          <Formik
            initialValues={answerFormInitialValues}
            onSubmit={handleSubmit}
            validationSchema={answerValidationSchema}
          >
            <StyledForm>
              <FaWindowClose onClick={() => setShow(false)} />
              <Field
                name="answer"
                as={StyledTextArea}
                placeholder="Write your answer here ..."
              />
              <Button isRed type="submit">
                Answer
              </Button>
            </StyledForm>
          </Formik>
        </>
      )}
      {answers.length > 0 && <Answer answers={answers} />}
    </Wrapper>
  );
};

export default Card;
