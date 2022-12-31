import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function ApproveCourseModal(props) {
  const [courseId, setCourseId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [day, setDay] = useState("");
  const [student, setStudent] = useState("");
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState([]);

  const fetchTutorHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000/get_All_Courses_Tutors",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      const data = resopnse.data.map((tutor) => {
        return tutor;
      });
      setTutors(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTutorHandler();
  }, []);

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/accept_course_request?course_id=${props.c_id}&tutor_id=${selectedTutor}`,
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
          props.onHide();
          props.fetchSessionsHandler();
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
          <h5>Select Tutor to proceed course request approval</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="col-sm-12 col-lg-6">
            <label htmlFor="Main_Organizer">
              <b>Main Tutor</b>
            </label>
            <select
              className="form-select"
              onChange={(e) => setSelectedTutor(e.target.value)}
            >
              <option value={"Any"} selected disabled>
                Any
              </option>
              {tutors.map((value) => {
                console.log(value);
                return (
                  <option value={value.tutor_id}>
                    {value.tutor_detail.tutor_name}
                  </option>
                );
              })}
            </select>
            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Create Job
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
