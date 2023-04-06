import { Form } from "formik";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;
export const Title = styled.p`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledError = styled.p`
  color: red;
  text-align: center;
`;
