// import { useCallback, useReducer } from "react";
import "../PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validation";
import {
  Button,
  Input,
  ErrorModal,
  LoadingSpinner,
  ImageUpload,
} from "../../../shared/components";
import { useForm, useHttpClient } from "../../../shared/hooks";
import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { useNavigate } from "react-router";

const NewPlace = () => {
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const submitPlaceHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (auth.isLoggedIn) {
      try {
        const formData = new FormData();
        formData.append("title", formState.inputs.title.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("address", formState.inputs.address.value);
        formData.append("creator", auth.userId);
        formData.append("image", formState.inputs.image.value);
        await sendRequest(
          "http://localhost:5000/api/places/",
          "POST",
          formData,
          { authorization: `Bearer ${auth.token}` }
        );
        navigate("/");
      } catch (error) {}
    }
    // else navigate to auth
  };

  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
      <form className="place-form" onSubmit={submitPlaceHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
