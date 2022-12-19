import React from "react";
import SideBar from "./SideBar";

import MainDiv from "./MainDiv";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {faFileCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

function Body() {
    const menu = [{
        icon: faHouse, classes: "active",
    }, {
        icon: faSquarePlus, classes: "",
    },];
    return (<div className="container app-body">
        <SideBar items={menu}></SideBar>
        <MainDiv></MainDiv>
    </div>);
}

export default Body;
