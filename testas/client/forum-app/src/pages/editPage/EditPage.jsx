import Card from "../../components/card/Card";
import { HOME_PATH } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import styled from "styled-components";

const EditPage = () => {
  const navigate = useNavigate();
  const { userObject } = useContext(UserContext);
  const { isLoading, data: questions } = useGetQuestions();
  const filteredQuestions =
    questions &&
    questions.filter((question) => question.user_id === userObject._id);

  return (
    <Container>
      <div>
        <MyQuestions onClick={() => navigate(HOME_PATH)}>
          list of my submitted questions
        </MyQuestions>
        <h1>
          Logged person is: {userObject.name} {userObject.last_name}
        </h1>
      </div>
      <Wrapper>
        {isLoading ? (
          <LoaderWrapper>loooooaaadddiiiinnnggg!!!!</LoaderWrapper>
        ) : (
          filteredQuestions.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              date={item.date}
              title={item.title}
              question={item.question}
              edited={item.edited}
              answers={item.answers}
              user_id={item.user_id}
            />
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default EditPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyQuestions = styled(Button)`
  padding: 20px;
`;
