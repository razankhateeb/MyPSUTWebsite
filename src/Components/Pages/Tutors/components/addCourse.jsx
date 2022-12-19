import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateCourse(props) {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [student, setStudent] = useState("");
  const [college, setCollege] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/Create_Course?course_id=${courseId}&course_name=${courseName}&college=${college}&student_id=${student}`,
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
          <h5>Add New Course</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Name">
                <b>Course ID</b>
              </label>
              <input
                type="number"
                placeholder="Enter Position Name"
                name="position"
                onChange={(e) => {
                  setCourseId(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Company Name">
                <b>Course Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Company Name"
                name="company"
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
                required
              />
            </div>

            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Major">
                <b>College</b>
              </label>
              <select
                list="major_list"
                placeholder="Select Major"
                name="major"
                onChange={(e) => {
                  setCollege(e.target.value);
                }}
                required
              >
                <option value={"Any"} disabled>
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
