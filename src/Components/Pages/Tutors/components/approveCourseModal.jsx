import { Modal } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    let resopnse = await axios.get("http://localhost:8000/get_All_Tutors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
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
        `http://localhost:8000/accept_course_request/${props.id}?course_id=${props.c_id}&tutor_id=${selectedTutor}`,
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
          props.fetchCourseRequestHandler();
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
          <div className="col-sm-12">
            <label htmlFor="Main_Organizer">
              <b>Assign Tutor</b>
            </label>
            <select
              className="form-select"
              onChange={(e) => setSelectedTutor(e.target.value)}
            >
              <option value={"Any"} selected disabled>
                Any
              </option>
              {tutors.map((value) => {
                return (
                  <option value={value.tutor_id}>{value.tutor_name}</option>
                );
              })}
            </select>
            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Assign Tutor
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
