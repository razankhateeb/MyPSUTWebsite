import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = React.createContext({
  userName: "",
  token: "",
  isLoggedIn: false,
  admin_role: "",
  user_id: "",
  login: (request) => {},
  logout: () => {},
  valid: true,
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();

  const initalToken = localStorage.getItem("access_token");
  const initalRole = localStorage.getItem("admin_role");
  const userName = localStorage.getItem("userName");
  const [token, setToken] = useState(initalToken);
  const [adminRole, setAdminRole] = useState(initalRole);
  const [username, setuserName] = useState(userName);
  const [userid, setuserID] = useState("");

  const [isvalid, setValid] = useState(true);

  const userIsLoggedIn = !!token;
  const loginHandler = async (request) => {
    try {
      await axios
        .post("http://localhost:8000/login/access-token", request)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
            setToken(response.data.access_token);
            setTimeout(logOutHandler, 3600000);
          }
        });
      //url, request body, headers/options/config
      await axios
        .post(
          "http://localhost:8000/login_admin_data",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          setAdminRole(res.data.user_role);
          setuserName(res.data.full_name);
          setuserID(res.data.id);

          localStorage.setItem("admin_role", res.data.user_role);
          switch (res.data.user_role) {
            case "SUPERUSER":
              navigate("Admin");
              break;
            case "EventsAdmin":
              navigate("EventMain");
              break;
            case "ClubsAdmin":
              navigate("ClubPage");
              break;
            case "JobsAdmin":
              navigate("JobsPage");
              break;
            case "TutorsAdmin":
              navigate("TutorsPage");
              break;
            case "BusAdmin":
              navigate("BusPage");
              break;
            case "PermitsAdmin":
              navigate("PermitsPage");
              break;
            default:
              navigate("/");
              break;
          }
        });
    } catch (error) {
      setValid(false);
    }
  };

  const logOutHandler = () => {
    localStorage.clear();
    setToken(null);
    setAdminRole(null);
    setuserName(null);
    setValid(true);
    setuserID(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
    admin_role: adminRole,
    userName: username,
    user_id: userid,
    valid: isvalid,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
