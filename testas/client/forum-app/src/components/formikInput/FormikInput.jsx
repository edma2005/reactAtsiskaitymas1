import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

const FormikInput = ({ name, placeholder, type = "text" }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form }) => (
          <StyledInput {...field} placeholder={placeholder} type={type} />
        )}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

const StyledInput = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 4px;
  color: black;
  padding: 10px 14px;
  border: none;
  outline: none;
  ${({ error }) =>
    error &&
    `
    border: 1px solid red;
  `}
`;

export default FormikInput;
