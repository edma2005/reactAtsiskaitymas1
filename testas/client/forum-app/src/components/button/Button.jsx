import styled from "styled-components";

const Button = ({ children, isRed, ...rest }) => {
  return (
    <StyledBtn isRed={isRed} {...rest}>
      {children}
    </StyledBtn>
  );
};

export default Button;

const StyledBtn = styled.button`
  color: red;
`;
