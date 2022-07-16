import { useParams } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validation";
import { Place } from "../../../user/interfaces/place";
import "../PlaceForm.css";

const MOCK_PLACES: Place[] = [
  {
    id: "p1",
    title: "Masarik Square",
    address: "Sderot Masaryk, Tel Aviv-Yafo",
    description:
      "The duck's garden, near Rabin square. There's a coffee house.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Masaryk_square.jpg/1280px-Masaryk_square.jpg",
    location: { lat: 32.0792889, lng: 34.7746337 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Masarik Square",
    address: "Sderot Masaryk, Tel Aviv-Yafo",
    description:
      "The duck's garden, near Rabin square. There's a coffee house.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Masaryk_square.jpg/1280px-Masaryk_square.jpg",
    location: { lat: 32.0792889, lng: 34.7746337 },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const { placeId } = useParams();

  const currentPlace = MOCK_PLACES.find(
    (mockPlace) => mockPlace.id === placeId
  );

  if (!currentPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  const [formState, inputHandler] = useForm(
    {
      title: { value: currentPlace.title, isValid: true },
      description: { value: currentPlace.description, isValid: true },
    },
    true
  );

  const submitUpdatePlaceHandler = (event) => {
    event.preventDefault();
    console.log("UpdatePlace: formState inputs:", formState.inputs); // TODO: send to backend
  };

  return (
    <form className="place-form" onSubmit={submitUpdatePlaceHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
