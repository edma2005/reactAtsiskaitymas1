import { LoaderWrapper, Wrapper } from "./styles";
import React, { useEffect, useState } from "react";

import Card from "../../components/card/Card";
import { fetchOneQuestion } from "../../api/questionsApi";
import { useParams } from "react-router-dom";

const Post = () => {
  const [item, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchOneQuestion(id)
      .then((questionData) => {
        setItem(questionData[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      {item.length !== 0 ? (
        <Wrapper>
          <Card
            id={item._id}
            date={item.date}
            title={item.title}
            question={item.question}
            edited={item.edited}
            answers={item.answers}
            comment={true}
          />
        </Wrapper>
      ) : (
        <LoaderWrapper>loooooaaadddiiiinnnggg!!!!</LoaderWrapper>
      )}
    </>
  );
};

export default Post;
