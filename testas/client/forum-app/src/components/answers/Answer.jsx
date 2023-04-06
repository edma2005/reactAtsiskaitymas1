import {
  Comment,
  CommentBottom,
  CommentTop,
  Delete,
  Like,
  StyledButtom,
  StyledForm,
  StyledMin,
  StyledShow,
  StyledTextArea,
  Wrapper,
} from "./styles";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { Field, Formik } from "formik";
import { deleteAnswer, patchAnswer } from "../../api/answersApi";
import { useContext, useState } from "react";

import Button from "../button/Button";
import { UserContext } from "../../contexts/UserContext";
import { answerValidationSchema } from "../../const/formikValidations";
import { patchLikesPostsUser } from "../../api/usersApi";
import { toast } from "react-hot-toast";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useGetUser } from "../../hooks/useUsers";

const Answer = ({ answers }) => {
  const { isLoggedIn, userObject } = useContext(UserContext);
  const { refetch: userRefetch } = useGetUser(userObject._id);
  const [editedAnswer, setEditedAnswer] = useState("");
  const [show, setShow] = useState(false);
  const { refetch } = useGetQuestions();

  const handleDelete = async (id) => {
    await deleteAnswer(id);
    toast.success("You have deleted answer!");
    await userRefetch(userObject._id);
    await refetch();
  };

  const handleEdit = async (id, post) => {
    try {
      await patchAnswer(id, post);
      setEditedAnswer("");
      refetch();
      toast.success("You have edited answer");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleLike = async (ansId) => {
    const type = { type: "answer" };
    try {
      await patchLikesPostsUser(userObject._id, ansId, type);
      toast.success("Liked!");
      await userRefetch(userObject._id);
      await refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const isLiked = (id) => {
    return answers.some((ans) =>
      userObject.liked_posts?.some(
        (post) => post.postId === id && post.type === "answer"
      )
    );
  };

  const last = answers.length - 1;
  return (
    <Wrapper>
      {show ? (
        <>
          <StyledMin onClick={() => setShow(false)} />
          {answers.map((ans) => (
            <Comment key={ans._id}>
              <CommentTop>
                {ans.user_id === userObject._id ? (
                  <Delete onClick={() => handleDelete(ans._id)} />
                ) : (
                  <>
                    {isLoggedIn && (
                      <>
                        {" "}
                        {isLiked(ans._id) ? (
                          <Like onClick={() => handleLike(ans._id)}>
                            <FaThumbsUp />
                          </Like>
                        ) : (
                          <Like onClick={() => handleLike(ans._id)}>
                            <FaRegThumbsUp />
                          </Like>
                        )}{" "}
                      </>
                    )}
                  </>
                )}
                <div>
                  {ans.user_id === userObject._id && (
                    <>
                      {editedAnswer === ans._id ? (
                        <StyledButtom onClick={() => setEditedAnswer("")}>
                          Cancel
                        </StyledButtom>
                      ) : (
                        <StyledButtom onClick={() => setEditedAnswer(ans._id)}>
                          Edit
                        </StyledButtom>
                      )}
                    </>
                  )}

                  {ans.edited ? <span>Edited</span> : <span>Not edited</span>}
                </div>
              </CommentTop>
              <CommentBottom>
                {editedAnswer === ans._id ? (
                  <Formik
                    initialValues={{ answer: ans.answer }}
                    onSubmit={(values) =>
                      handleEdit(ans._id, { answer: values.answer })
                    }
                    validationSchema={answerValidationSchema}
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
                        <Field
                          name="answer"
                          as={StyledTextArea}
                          placeholder="Write your answer here ..."
                        />
                        <Button isRed type="submit">
                          Save Changes
                        </Button>
                      </StyledForm>
                    )}
                  </Formik>
                ) : (
                  <p>{ans.answer}</p>
                )}
              </CommentBottom>
            </Comment>
          ))}
        </>
      ) : (
        <>
          <Comment key={answers[last]._id}>
            <CommentTop>
              <span>
                {answers.length}
                <StyledShow onClick={() => setShow(true)} />
              </span>
              {answers[last].edited ? (
                <span>Edited</span>
              ) : (
                <span>Not edited</span>
              )}
            </CommentTop>
            <CommentBottom>
              <p>{answers[last].answer}</p>
            </CommentBottom>
          </Comment>
        </>
      )}
    </Wrapper>
  );
};

export default Answer;
