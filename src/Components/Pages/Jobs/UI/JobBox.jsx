import React from "react";
function JobBox() {
  return (
    <div class="project-box-wrapper">
      <div class="project-box">
        <div class="project-box-header">
          <div class="more-wrapper">
            <button
              class="project-btn-more fa-solid fa-pen"
              title="More Details"
              onclick="openJob()"
            ></button>
          </div>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header">Vacancy Position</p>
          <p class="box-content-subheader">Vacancy ID</p>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header">Company Name</p>
          <p class="box-content-subheader">Amman, Jordan</p>
        </div>
        <div class="project-box-content-header">
          <p class="box-content-header">Major</p>
          <p class="box-content-subheader">level</p>
        </div>
      </div>
    </div>
  );
}

export default JobBox;
