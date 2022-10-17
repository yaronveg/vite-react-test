import { useContext, useState } from "react";
import { Button, Card, Map, Modal } from "../../../../shared/components";
import { AuthContext } from "../../../../shared/context/auth-context";
import { IdType, Coordinates } from "../../../../user/interfaces";
import "./PlaceItem.css";

const PlaceItem = (props: {
  id: IdType;
  title: string;
  description: string;
  address: string;
  coordinates: Coordinates;
  image: string;
  creator: IdType;
}) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmDeleteHandler = () => setShowConfirmDelete(true);
  const cancelDeleteHandler = () => {
    setShowConfirmDelete(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmDelete(false);
    console.log("deleting...");
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          {props.coordinates && <Map center={props.coordinates} zoom={16} />}
        </div>
      </Modal>
      <Modal
        show={showConfirmDelete}
        header={`Delete ${props.title}?`}
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              YES, DELETE.
            </Button>
          </>
        }
      >
        <p>This action is permanent.</p>
        <p>Are you sure you want to delete {props.title}?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={openConfirmDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
