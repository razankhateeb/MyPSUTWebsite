import React from "react";

import "../CSS/jobs.css";
function JobDetails() {
  return (
    <div class="form-popup" id="editJobVacency">
      <form action="/action_page.php" class="form-container">
        <div class="form-head">
          {" "}
          <button
            class="fa-solid fa-xmark closex"
            onclick="closeJob()"
          ></button>
          <h5>Job Name</h5>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Job ID</b>
            </label>
            <input type="number" placeholder="273" name="email" />
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Vacancy Position</b>
            </label>
            <input type="Text" placeholder="Software Engineer" name="email" />
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Company Name</b>
            </label>
            <input type="text" placeholder="Company Name" name="email" />
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Company Location</b>
            </label>
            <input type="number" placeholder="Amman, Jordan" name="email" />
          </div>

          <div class="col-sm-12 col-md-6">
            <label>
              <b>Position Level</b>
            </label>
            <input type="number" placeholder="Entry Level" name="email" />
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Required Major</b>
            </label>
            <input type="text" placeholder="IT" required />
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Job Description</b>
            </label>
            <textarea rows="6"></textarea>
          </div>
          <div class="col-sm-12 col-md-6">
            <label>
              <b>Job Requirements</b>
            </label>
            <textarea rows="6"></textarea>
          </div>

          <div class="col-sm-12 col-md-4">
            <button type="button" class="btn" onclick="closeJob()">
              Save
            </button>
          </div>
          <div class="col-sm-12 col-md-4">
            <button type="button" class="btn disable" onclick="closeJob()">
              Disable Vacancy
            </button>
          </div>
          <div class="col-sm-12 col-md-4">
            <button type="button" class="btn cancel" onclick="closeJob()">
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default JobsDetails;
