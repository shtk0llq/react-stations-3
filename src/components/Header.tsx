import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "../api/axios";
import "../styles/Header.scss";

export interface User {
  name: string;
  iconUrl: string;
}

const Header = () => {
  const [cookies] = useCookies(["token"]);

  const {
    data: user,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get<User>("/users", {
        headers: {
          Authorization: `Bearer ${cookies["token"]}`,
        },
      });
      return data;
    },
  });

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <h1 className="logo-text">
            <Link to="/">Stations 3</Link>
          </h1>
        </div>

        <div>
          {user ? (
            <div className="user-info">
              {user.iconUrl && (
                <img
                  src={user.iconUrl}
                  alt={user.name}
                  className="user-avatar"
                />
              )}
              <span className="user-name">{user.name}</span>
            </div>
          ) : (
            <Link to="/signin" className="login-button">
              ログイン
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
