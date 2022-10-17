import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import { Place } from "../../../user/interfaces/place";
import PlaceItem from "./PlaceItem/PlaceItem";
import "./PlaceList.css";

const PlaceList = (props: { items: Place[] }) => {
  if (!props.items.length) {
    return (
      <div className=" place-list center">
        <Card>
          <h2>No places found</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place: Place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          address={place.address}
          description={place.description}
          image={place.imageUrl}
          coordinates={place.location}
          creator={place.creator}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
