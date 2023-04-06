import Button from "../../components/button/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledButtom = styled(Button)`
  margin: 20px;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MyQuestions = styled(Button)`
  padding: 20px;
`;
