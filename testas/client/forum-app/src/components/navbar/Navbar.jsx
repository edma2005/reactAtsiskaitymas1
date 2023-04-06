import {
  ADD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
} from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, handleLogOut } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BtnContainer>
        {isLoggedIn ? (
          <>
            <NavItem onClick={handleLogOut}>
              <span>Press to logout</span>
            </NavItem>
            <NavItem onClick={() => navigate(ADD_PATH)}>
              <span>Add question</span>
            </NavItem>
            <NavItem onClick={() => navigate(HOME_PATH)}>
              <span>Questions Page</span>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem onClick={() => navigate(LOGIN_PATH)}>
              <span>Login Page</span>
            </NavItem>
            <NavItem onClick={() => navigate(REGISTER_PATH)}>
              <span>Register Page</span>
            </NavItem>
            <NavItem onClick={() => navigate(HOME_PATH)}>
              <span>Questions Page</span>
            </NavItem>
          </>
        )}
      </BtnContainer>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const BtnContainer = styled.div`
  margin-right: 20px;
  display: flex;
`;
const NavItem = styled.div`
  padding: 20px;
  margin: 0;
  cursor: pointer;
  transition: 300ms;
  span {
    color: green;
    transition: 300ms;
  }
`;
