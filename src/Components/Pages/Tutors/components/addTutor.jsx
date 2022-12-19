import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateTutor(props) {
  const [name, setName] = useState("");
  const [gpa, setGpa] = useState("");
  const [student, setStudent] = useState("");
  const [year, setYear] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/Create_Tutor?tutor_name=${name}&gpa=${gpa}&year=${year}&student_id=${student}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
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

  const resetForm = () => {};

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
          <h5>Add New Tutor</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Student ID</b>
              </label>
              <input
                type="number"
                placeholder="Student ID"
                name="company"
                onChange={(e) => {
                  setStudent(e.target.value);
                }}
                required
              />
            </div>
            {/* <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Name">
                <b>Student Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Position Name"
                name="position"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div> */}
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Student GPA</b>
              </label>
              <input
                type="number"
                placeholder="Student gpa"
                name="company"
                onChange={(e) => {
                  setGpa(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Student Year</b>
              </label>
              <input
                type="number"
                placeholder="Student year"
                name="company"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                required
              />
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
