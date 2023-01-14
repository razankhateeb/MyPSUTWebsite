import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavItem = (props) => {
    const icon = props.icon;
    const classes = "nav-link app-sidebar-link " + props.classes;
    const func = props.onClick;

    return (
        <li className="nav-item">
            <a className={classes}>
                <i>
                    <FontAwesomeIcon icon={icon} onClick={func}/>
                </i>
            </a>
        </li>
    );
};

export default NavItem;

/* <FontAwesomeIcon icon={faCalendarPlus} /> */
