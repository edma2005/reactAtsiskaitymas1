import {
  BackgroundWrapper,
  BtnWrapper,
  InputWrapper,
  StyledError,
  StyledForm,
  Title,
  Wrapper,
} from "./styles";
import {
  registerFormInitialValues,
  registerValidationSchema,
} from "../../const/formikValidations";

import Button from "../../components/button/Button";
import { Formik } from "formik";
import FormikInput from "../../components/formikInput/FormikInput";
import { LOGIN_PATH } from "../../routes/consts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/useUsers";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);
  const { mutateAsync: registerUser } = useRegisterUser();
  const navigate = useNavigate();
  const handleSubmit = async (user) => {
    delete user.confirm_password;
    try {
      await registerUser(user);
      navigate(LOGIN_PATH);
      toast.success("Succesfuly registered!");
    } catch (err) {
      setError(true);
      toast.error("Something went wrong, please try again");
    }
  };
  return (
    <BackgroundWrapper>
      <Wrapper>
        <Formik
          initialValues={registerFormInitialValues}
          onSubmit={handleSubmit}
          validationSchema={registerValidationSchema}
        >
          <StyledForm>
            <Title>Register Page</Title>
            {error && <StyledError>Email is already used</StyledError>}
            <InputWrapper>
              <FormikInput name="name" type="text" placeholder="Your name" />
              <FormikInput
                name="last_name"
                type="text"
                placeholder="Your last name"
              />
              <FormikInput
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <FormikInput
                name="password"
                type="password"
                placeholder="Enter password"
              />
              <FormikInput
                name="confirm_password"
                type="password"
                placeholder="Repeat Password"
              />
            </InputWrapper>
            <BtnWrapper>
              <Button isRed type="submit">
                Press to Register
              </Button>
              <Button onClick={() => navigate(LOGIN_PATH)}>
                Press to Login
              </Button>
            </BtnWrapper>
          </StyledForm>
        </Formik>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default Login;
