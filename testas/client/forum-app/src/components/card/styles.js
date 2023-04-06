import Button from "../button/Button";
import { Form } from "formik";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Post = styled.div`
  border: 10px solid black;
`;

export const PostTop = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const PostBotom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledTextArea = styled.textarea`
  color: black;
  padding: 20px;
  border: none;
  outline: none;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  Button {
    padding: 20px;
  }
`;

export const Like = styled.div`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const Delete = styled(RiDeleteBinLine)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const StyledButtom = styled(Button)`
  padding: 20px;
`;
