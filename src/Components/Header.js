import React from "react";

function HeaderComponent() {
  return (
    <div>
      <header>
        <div class="container">
          <div class="app-header container-fluid">
            <div class="app-header-left">
              <span class="app-icon"> </span>
              <a class="app-name" title="Home">
                MyPSUTWebApp
              </a>
              <div class="search-wrapper">
                <input class="search-input" type="text" placeholder="Search" />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div class="app-header-right">
              <button class="mode-switch" title="Switch Theme">
                <i class="fa-regular fa-moon"></i>
                <i class="fa-solid fa-moon"></i>
              </button>
              <button class="notification-btn">
                <i class="fa-regular fa-bell"></i>
              </button>
              <button class="profile-btn">
                <i class="fa-regular fa-user"></i>
                <span>User</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderComponent;
