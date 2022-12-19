import React from "react";

import NavItem from "./NavItem";

const SideBar = (props) => {
  return (
    <nav className="app-sidebar">
      <div className="container-fluid">
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            {props.items.map((item) => (
              <NavItem
                icon={item.icon}
                classes={item.classes}
                onClick={item.onClick}
              ></NavItem>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
