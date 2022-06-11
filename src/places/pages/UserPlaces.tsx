import { useParams } from "react-router-dom";
import { Place } from "../../user/interfaces/place";
import PlaceList from "../components/PlaceList/PlaceList";

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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = MOCK_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
