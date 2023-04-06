import Button from "../button/Button";
import { FaArrowUp } from "react-icons/fa";
import { Form } from "formik";
import { GoCommentDiscussion } from "react-icons/go";
import { RiDeleteBin2Line } from "react-icons/ri";
import styled from "styled-components";

export const Comment = styled.div`
  width: 100%;
  border: 10px solid black;
`;

export const CommentTop = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const CommentBottom = styled.div`
  padding: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledMin = styled(FaArrowUp)`
  position: absolute;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const StyledShow = styled(GoCommentDiscussion)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const Like = styled.div`
  cursor: pointer;
  &:hover {
    svg {
      color: red;
    }
  }
`;

export const Delete = styled(RiDeleteBin2Line)`
  color: red;
  cursor: pointer;
  transition: 300ms;
  &:hover {
    color: red;
  }
`;

export const StyledButtom = styled(Button)`
  padding: 20px;
`;

export const StyledForm = styled(Form)`
  position: relative;
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
