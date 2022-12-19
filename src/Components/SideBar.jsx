import React from "react";

import NavItem from "./NavItem";

const SideBar = (props) => {
    return (
        <nav className="app-sidebar">
            <div className="container-fluid">
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <NavItem
                            icon={props.items[0].icon}
                            classes={props.items[0].classes}
                        ></NavItem>
                        <NavItem
                            icon={props.items[1].icon}
                            classes={props.items[1].classes}
                            onClick={props.items[1].onClick}
                        ></NavItem>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SideBar;
