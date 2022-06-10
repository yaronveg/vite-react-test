import UsersList from "../components/UsersList/UsersList";
import { User } from "../interfaces/user";

const Users = () => {
  const USERS: User[] = [
    {
      id: "u1",
      name: "Yaron Veg",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      placeCount: 58,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
