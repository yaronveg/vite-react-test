import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks";
import { ErrorModal, LoadingSpinner } from "../../shared/components";
import PlaceList from "../components/PlaceList/PlaceList";
import { IdType, Place } from "../../user/interfaces";

const UserPlaces = () => {
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState<Place[]>([]);
  const userId = useParams().userId;
  const fetchPlaces = useCallback(async () => {
    try {
      const resData = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );
      setUserPlaces(resData.places);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId: IdType) => {
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && userPlaces && (
        <PlaceList items={userPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
