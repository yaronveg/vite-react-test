import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../../shared/components/UIElements/Card/Card";
import { User } from "../../interfaces/user";
import "./UserItem.css";

const UsersItem = ({
  id,
  image,
  name,
  placeCount,
}: {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
