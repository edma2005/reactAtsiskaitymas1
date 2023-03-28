import styled from "styled-components";
import {
  REGISTER_PATH,
  LOGIN_PATH,
  HOME_PATH,
  ADD_PATH,
} from "../routes/const";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <Container>
      <NavItem as={Link} to={HOME_PATH}>
        Home
      </NavItem>
      <NavItem as={Link} to={LOGIN_PATH}>
        Login Page
      </NavItem>
      <NavItem as={Link} to={REGISTER_PATH}>
        Register Page
      </NavItem>
      <NavItem as={Link} to={ADD_PATH}>
        Add Page
      </NavItem>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: lightblue;
`;

const NavItem = styled.a`
  cursor: pointer;
  padding: 20px;
  font-size: 1.3rem;
  text-decoration: none;
  :hover {
    transition: ease-in-out 0.5s;
    color: red;
  }
`;
