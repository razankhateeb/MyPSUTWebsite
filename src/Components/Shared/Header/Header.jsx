import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as emptyMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Search from "./Search";
import AuthContext from "../../../Auth/authContext";

function HeaderComponent() {
  const authCtx = useContext(AuthContext);

  function toggleTheme() {
    var modeSwitch = document.querySelector(".mode-switch");

    modeSwitch.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");
      modeSwitch.classList.toggle("active");
    });
  }

  return (
    <header>
      <div className="container">
        <div className="app-header container-fluid">
          <div className="app-header-left">
            <span className="app-icon"> </span>
            <a className="app-name" title="Home">
              MyPSUTWebApp
            </a>
            <Search></Search>
          </div>
          <div className="app-header-right">
            <button
              className="mode-switch"
              title="Switch Theme"
              onClick={toggleTheme}
            >
              <i>
                <FontAwesomeIcon
                  icon={emptyMoon}
                  className="fa-regular fa-moon "
                />
              </i>
              <i>
                <FontAwesomeIcon icon={faMoon} className="fa-solid fa-moon" />
              </i>
            </button>
            <button className="notification-btn" onClick={authCtx.logout}>
              <i>
                <FontAwesomeIcon icon={faSignOut} />
              </i>
            </button>
            <button className="profile-btn">
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>

              <span>{authCtx.userName}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
