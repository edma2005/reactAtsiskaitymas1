import styled from "styled-components";

const MainLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;

const Wrapper = styled.div`
  margin: 50px;
`;
