import {
  Container,
  LoaderWrapper,
  MyQuestions,
  StyledButtom,
  Wrapper,
} from "./styles";
import { useContext, useMemo, useState } from "react";

import Card from "../../components/card/Card";
import { EDIT_PATH } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import { useGetQuestions } from "../../hooks/useQuestions";
import { useNavigate } from "react-router-dom";
import { useUpdateUser } from "../../hooks/UseUserUpdate";

const Home = () => {
  const { userObject, isLoggedIn } = useContext(UserContext);
  const [reversed, setReversed] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const { isLoading, data: questions } = useGetQuestions();
  const navigate = useNavigate();
  if (isLoggedIn) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateUser(userObject._id);
  }

  const sortQuestions = (sortOrder) => {
    setSortBy(sortOrder);
    if (sortOrder === "newest") {
      setReversed(false);
    } else if (sortOrder === "oldest") {
      setReversed(true);
    }
  };

  const sortedQuestions = useMemo(() => {
    if (sortBy === "newest") {
      return questions
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      return questions
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      return questions;
    }
  }, [questions, sortBy]);

  return (
    <Container>
      <div>
        {isLoggedIn ? (
          <div>
            <MyQuestions onClick={() => navigate(EDIT_PATH)}>
              list of my submitted questions
            </MyQuestions>
            <h1>
              Logged person is: {userObject.name} {userObject.last_name}
            </h1>
          </div>
        ) : (
          <div>
            <h1>please log in!</h1>
          </div>
        )}
      </div>
      <Wrapper>
        <div>
          {!reversed ? (
            <StyledButtom onClick={() => sortQuestions("oldest")}>
              Sort by oldest
            </StyledButtom>
          ) : (
            <StyledButtom onClick={() => sortQuestions("newest")}>
              Sort by newest
            </StyledButtom>
          )}
        </div>
        {isLoading ? (
          <LoaderWrapper>loooooaaadddiiiinnnggg!!!!</LoaderWrapper>
        ) : (
          sortedQuestions.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              date={item.date}
              title={item.title}
              question={item.question}
              edited={item.edited}
              answers={item.answers}
              user_id={item.user_id}
              comment={false}
            />
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
