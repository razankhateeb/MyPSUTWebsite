import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListUl, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";

import "../CSS/jobs.css";
import ProjectsHeader from "./Shared/Project/ProjectHeader";
import ProjectBox from "./Shared/Project/ProjectBox";

function MainDiv() {
    return (<main role="main" className="pb-3 page-main">
        <div className="app-list">
            <div className="projects-section">
                <ProjectsHeader></ProjectsHeader>
                <div className="projects-section-line">
                    <div className="projects-status">
                        <div className="item-status">
                            <span className="status-number">30</span>
                            <span className="status-type">Open Vacancies</span>
                        </div>
                    </div>
                    <div className="view-actions">
                        <button className="view-btn list-view active" title="List View">
                            <i>
                                <FontAwesomeIcon icon={faListUl}/>
                            </i>
                        </button>
                        <button className="view-btn grid-view" title="Export">
                            <i>
                                <FontAwesomeIcon icon={faShareFromSquare}/>
                            </i>
                        </button>
                    </div>
                </div>
                <div className="project-boxes jsListView">
                    <ProjectBox></ProjectBox>
                    <ProjectBox></ProjectBox>
                    <ProjectBox></ProjectBox>
                    <ProjectBox></ProjectBox>
                    <ProjectBox></ProjectBox>
                </div>
            </div>
        </div>
    </main>);
}

export default MainDiv;
