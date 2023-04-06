import { Form } from "formik";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const SideWrapper = styled.div`
  max-width: 300px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      text-align: center;
    }
  }
  p {
    text-align: center;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.p`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTextArea = styled.textarea`
  color: black;
`;
