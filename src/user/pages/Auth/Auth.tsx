import { useContext, useState } from "react";
import {
  Button,
  Card,
  Input,
  LoadingSpinner,
  ErrorModal,
  ImageUpload,
} from "../../../shared/components";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm, useHttpClient } from "../../../shared/hooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validation";
import "./Auth.css";

const Auth = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, serverError, sendRequest, clearError } = useHttpClient();

  const submitAuthHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("Auth: formState inputs:", formState.inputs);

    if (isLoginMode) {
      try {
        const resData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(resData.user.id);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData(); // FormData is a broswer api
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value); // this "image" key matches the key in backend. multer's middleware is looking for "image" ( multer.single("image") )
        const resData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        auth.login(resData.user.id);
      } catch (error) {}
    }
  };
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={submitAuthHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="What did you do?"
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Password must contain at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
