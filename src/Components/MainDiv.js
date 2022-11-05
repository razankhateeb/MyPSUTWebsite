import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

import "../css/jobs.css";
import ProjectsHeader from "./Shared/Project/ProjectHeader";
import ProjectBox from "./Shared/Project/ProjectBox";

function MainDiv() {
  return (
    <main role="main" class="pb-3 page-main">
      <div class="app-list">
        <div class="projects-section">
          <ProjectsHeader></ProjectsHeader>
          <div class="projects-section-line">
            <div class="projects-status">
              <div class="item-status">
                <span class="status-number">30</span>
                <span class="status-type">Open Vacancies</span>
              </div>
            </div>
            <div class="view-actions">
              <button class="view-btn list-view active" title="List View">
                <i>
                  <FontAwesomeIcon icon={faListUl} />
                </i>
              </button>
              <button class="view-btn grid-view" title="Export">
                <i>
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </i>
              </button>
            </div>
          </div>
          <div class="project-boxes jsListView">
            <ProjectBox></ProjectBox>
            <ProjectBox></ProjectBox>
            <ProjectBox></ProjectBox>
            <ProjectBox></ProjectBox>
            <ProjectBox></ProjectBox>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainDiv;
