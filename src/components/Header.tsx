import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../stores/hooks";
import axios from "../api/axios";
import "../styles/Header.scss";
import { signout } from "../stores/authSlice";

export interface User {
  name: string;
  iconUrl: string;
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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

  const handleLogout = async function () {
    removeCookie("token");
    dispatch(signout());
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/signin");
  };

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
              <Link to="/profile">
                <img
                  src={user.iconUrl}
                  alt={user.name}
                  className="user-avatar"
                />
              </Link>
              <span className="user-name">{user.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                ログアウト
              </button>
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
