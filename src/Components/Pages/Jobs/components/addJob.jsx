import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateJob(props) {
  // const [modalAddJobShow, setModalAddJobShow] = useState(false);

  const position = useRef("");
  const company = useRef("");
  // const [position, setPosition] = useState("");
  // const [company, setCompany] = useState("");
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
    await axios
      .post(
        `http://localhost:8000/create_job?job_title=${position.current.value}&company_name=${company.current.value}&college=${major}&job_responsanbilities=${resposibility}&job_requierments=${condition}&job_Deadline=${deadline}&job_description=${description}`,
        request
      )
      .then((response) => {
        if (response.status === 200) {
          success();
          resetForm();
        }
      })
      .catch((error) => {
        errormsg();
      });
  };

  const resetForm = () => {
    position.current.value = "";
    company.current.value = "";

    // setPosition("");
    // setCompany("");
    setMajor("");
    setDeadline("");
    setDescription("");
    setCondition("");
  };

  return (
    <Modal
      show={props.show}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Create New Job Listing</h5>
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
                placeholder="Enter Position Name"
                name="position"
                ref={position}
                // onChange={(e) => {
                //   setPosition(e.target.value);
                // }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Company Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Company Name"
                name="company"
                ref={company}
                // onChange={(e) => {
                //   setCompany(e.target.value);
                // }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Company Image</b>
              </label>
              <input
                type="file"
                placeholder="Filename"
                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Major">
                <b>Major</b>
              </label>
              <select
                list="major_list"
                placeholder="Select Major"
                name="major"
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
                required
              >
                <option value={"Any"}>Any</option>
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
                placeholder="Enter Applications Deadline"
                name="deadline"
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Conditions">
                <b>Conditions</b>
              </label>
              <textarea
                rows="6"
                placeholder="Job Conditions"
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
                required
              ></textarea>
            </div>

            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Start Time">
                <b>Job Responsibilities</b>
              </label>
              <textarea
                rows="6"
                placeholder="Job Responsibilities"
                onChange={(e) => {
                  setResposibility(e.target.value);
                }}
                required
              ></textarea>
            </div>

            <div className="col-sm-12 col-lg-4">
              <label htmlFor="Start Time">
                <b>Job Description</b>
              </label>
              <textarea
                rows="6"
                placeholder="Job Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
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
