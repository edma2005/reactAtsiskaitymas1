import React from "react";
import styled from "styled-components";
import PostsList from "../components/PostsList";
import PostAdd from "../components/PostAdd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgreen;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <Wrapper>
      <PostsList />
      <PostAdd />
    </Wrapper>
  );
};

export default Home;
