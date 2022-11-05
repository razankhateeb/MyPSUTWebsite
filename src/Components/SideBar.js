import React from "react";

function SideBar() {
  return (
    <div>
      <nav class="app-sidebar">
        <div class="container-fluid">
          <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul class="navbar-nav flex-grow-1">
              <li class="nav-item">
                <a class="nav-link app-sidebar-link active">
                  <i class="fa-solid fa-house"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link app-sidebar-link" onclick="openNew()">
                  <i class="fa-solid fa-calendar-plus"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
