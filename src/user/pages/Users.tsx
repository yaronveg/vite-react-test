import { useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import { ErrorModal, LoadingSpinner } from "../../shared/components";
import { useHttpClient } from "../../shared/hooks";

const Users = () => {
  const [users, setUsers] = useState();
  const { serverError, isLoading, clearError, sendRequest } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resData = await sendRequest("http://localhost:5000/api/users");
        setUsers(resData.users);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={serverError} onClear={clearError} />
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
