import { useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import { ErrorModal, LoadingSpinner } from "../../shared/components";
import { User } from "../interfaces/user";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/api/users");
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message);
        }
        setUsers(resData.users);
      } catch (error) {
        setServerError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setServerError(null);
  };

  return (
    <>
      <ErrorModal error={serverError} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
