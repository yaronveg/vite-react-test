import "../PlaceForm.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validation";
import {
  Button,
  Input,
  Card,
  LoadingSpinner,
  ErrorModal,
} from "../../../shared/components";
import { useForm, useHttpClient } from "../../../shared/hooks";
import { Place } from "../../../user/interfaces/place";
import { AuthContext } from "../../../shared/context/auth-context";

const UpdatePlace = () => {
  const { placeId } = useParams();
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();
  const [currentPlace, setCurrentPlace] = useState<null | Place>(null);
  const {formState, inputHandler, setFormData} = useForm(
    {
      title: "",
      description: "",
    },
    false
  );
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const resData = await sendRequest(
          `${import.meta.env.YV_DEV_SERVER_BASE_URL}places/${placeId}`
        );
        setCurrentPlace(resData.place);
        setFormData(
          {
            title: { value: resData.place.title, isValid: true },
            description: { value: resData.place.description, isValid: true },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentPlace && !serverError) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  const submitUpdatePlaceHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.YV_DEV_SERVER_BASE_URL}places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.token}`,
        }
      );
      navigate(`/${auth.userId}/places`);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={!!serverError} onClear={clearError} />
      {!isLoading && currentPlace && (
        <form className="place-form" onSubmit={submitUpdatePlaceHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={currentPlace.title}
            initialIsValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)"
            onInput={inputHandler}
            initialValue={currentPlace.description}
            initialIsValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
