import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function EditJob(props) {
  console.log(props.data.req);
  const [position, setPosition] = useState(props.data.position);
  const [company, setCompany] = useState(props.data.company);
  const [major, setMajor] = useState(props.data.major);
  const [deadline, setDeadline] = useState(props.data.deadline);
  const [description, setDescription] = useState(props.data.description);
  const [responsibility, setResponsibility] = useState(
    props.data.responsibility
  );
  const [requirements, setRequirements] = useState(props.data.requirements);
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    const request = new FormData();
    request.append("job_image", image);
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/job_id/${props.data.id}?job_title=${position}&company_name=${company}&college=${major}&job_responsanbilities=${responsibility}&job_requierments=${responsibility}&job_Deadline=${deadline}&job_description=${description}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          props.fetchJobsHandler();
          props.onHide();
          success();
        }
      })
      .catch((error) => {
        errormsg();
      });
  };

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
                accept="image/png,image/jpeg,image/jpg"
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
                className="form-select"
                value={`${major}`}
                list="major_list"
                placeholder="Select Major"
                name="major"
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
              >
                <option value={"Any"} selected disabled>
                  Any
                </option>
                <option value={"Faculty of Computing Sciences"}>
                  King Hussein Faculty of Computing Sciences
                </option>
                <option value={"Faculty of Engineering"}>
                  King Abdullah II Faculty of Engineering
                </option>
                <option value={"School of Business Technology"}>
                  King Talal School of Business Technology
                </option>
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
              <label htmlFor="responsibility">
                <b>Job Responsibility</b>
              </label>
              <textarea
                rows="6"
                value={responsibility}
                onChange={(e) => {
                  setResponsibility(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Start Time">
                <b>Job Requirements</b>
              </label>
              <textarea
                rows="6"
                value={requirements}
                onChange={(e) => {
                  setRequirements(e.target.value);
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
