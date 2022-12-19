import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const error = () => toast.error("Oops! An error occurred.");

export default function EditJob(props) {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [major, setMajor] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [resposibility, setResposibility] = useState("");
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    const request = new FormData();
    request.append("job_image", image);
    //axios helps to send post
    await axios.post(
      `http://localhost:8000/create_job?job_title=${position}&company_name=${company}&college=${major}&job_responsanbilities=${resposibility}&job_requierments=${condition}&job_Deadline=${deadline}&job_description=${description}`,
      request
    );
  };

  function fileSelectedChanged(obj) {
    var filePath = obj.value;

    var ext = filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase();
    if (ext !== "csv") {
      alert("Only files with the file extension CSV are allowed");
    } else {
      document.getElementById("form1").submit();
    }
  }

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Edit Job</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="Event Name">
                <b>Position Name</b>
              </label>
              <input
                type="text"
                value={position}
                placeholder={position}
                name="position"
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Company Name</b>
              </label>
              <input
                type="text"
                value={company}
                name="company"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Company Image</b>
              </label>
              <input
                type="file"
                value={image}
                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Major">
                <b>Major</b>
              </label>
              <select
                list="major_list"
                value={major}
                name="major"
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
              >
                <option value="none" selected disabled hidden>
                  Select a College
                </option>
                <option value={"IT"}>IT</option>
                <option value={"Engineering"}>Engineering</option>
                <option value={"Business"}>Business</option>
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Deadline">
                <b>Deadline</b>
              </label>
              <input
                className="datepicker"
                type="date"
                value={deadline}
                name="deadline"
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Conditions">
                <b>Conditions</b>
              </label>
              <textarea
                rows="6"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Start Time">
                <b>Job Responsibilities</b>
              </label>
              <textarea
                rows="6"
                value={resposibility}
                onChange={(e) => {
                  setResposibility(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Start Time">
                <b>Job Description</b>
              </label>
              <textarea
                rows="6"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Create Job
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Toaster position="top-right" reverseOrder={true} />
    </Modal>
  );
}
