import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

import JobsProjectBox from "./Pages/Jobs/UI/JobsProjectBox";
import JobsProjectHeader from "./Pages/Jobs/UI/JobsProjectHeader";

function JobsDiv() {
  return (
    <main role="main" class="pb-3 page-main">
      <div class="app-list">
        <div class="projects-section">
          <JobsProjectHeader></JobsProjectHeader>
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
            <JobsProjectBox></JobsProjectBox>
            <JobsProjectBox></JobsProjectBox>
            <JobsProjectBox></JobsProjectBox>
            <JobsProjectBox></JobsProjectBox>
            <JobsProjectBox></JobsProjectBox>
          </div>
        </div>
      </div>
    </main>
  );
}

export default JobsDiv;
