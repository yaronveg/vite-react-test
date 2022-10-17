import { Button, Card } from "../../../shared/components";
import { IdType, Place } from "../../../user/interfaces";
import PlaceItem from "./PlaceItem/PlaceItem";
import "./PlaceList.css";

const PlaceList = (props: {
  items: Place[];
  onDeletePlace: (deletedPlaceId: IdType) => void;
}) => {
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
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
