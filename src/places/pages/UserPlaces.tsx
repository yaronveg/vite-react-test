import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks";
import { ErrorModal, LoadingSpinner } from "../../shared/components";
import PlaceList from "../components/PlaceList/PlaceList";
import { Place } from "../../user/interfaces";

const UserPlaces = () => {
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState<Place[]>([]);
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const resData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setUserPlaces(resData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && userPlaces && <PlaceList items={userPlaces} />}
    </>
  );
};

export default UserPlaces;
