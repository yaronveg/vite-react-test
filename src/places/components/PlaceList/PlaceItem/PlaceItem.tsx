import { useContext, useState } from "react";
import {
  Button,
  Card,
  Map,
  Modal,
  ErrorModal,
  LoadingSpinner,
} from "../../../../shared/components";
import { AuthContext } from "../../../../shared/context/auth-context";
import { useHttpClient } from "../../../../shared/hooks";
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
  onDelete: (deletedPlaceId: IdType) => void;
}) => {
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmDeleteHandler = () => setShowConfirmDelete(true);
  const cancelDeleteHandler = () => {
    setShowConfirmDelete(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmDelete(false);
    try {
      await sendRequest(
        `${import.meta.env.YV_DEV_SERVER_BASE_URL}places/${props.id}`,
        "DELETE",
        undefined,
        { authorization: `Bearer ${auth.token}` }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={import.meta.env.YV_DEV_SERVER_ASSET_URL + props.image}
              alt={props.title}
            />
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
            {auth.isLoggedIn && auth.userId === props.creator && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && auth.userId === props.creator && (
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
