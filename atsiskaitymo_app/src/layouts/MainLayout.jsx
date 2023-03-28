import styled from "styled-components";
import TopBar from "../layouts/TopBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <TopBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  margin-left: 50px;
`;
