import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import "../CSS/tutors.css";
import EditSession from "./editSession";
import axios from "axios";

export default function TutoringMainProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);

  function CloseAdd() {
    setModalShow(false);
  }

  const deleteSessionsHandler = useCallback(async (course_session_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_course_session/${course_session_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      props.fetchSessionsHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.data.day}</span>
          <div className="more-wrapper">
            <button
              className="project-btn-more"
              onClick={() => setModalShow(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.data.course_name}</p>
          <p className="box-content-subheader">{props.data.course_id}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.data.std_name}</p>
          <p className="box-content-subheader">{props.data.std_id}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">Sessions</p>
          <p className="box-content-subheader">
            {props.data.sessions.map((value) => {
              return (
                <>
                  <span>
                    <b>{value.day}: </b>
                  </span>
                  {`${value.start_time} -  ${value.end_time}`}
                  <br></br>
                </>
              );
            })}
          </p>
        </div>
      </div>
      {/* <EditForm show={modalShow} onHide={() => setModalShow(false)} /> */}
      <EditSession
        fetchSessionsHandler={props.fetchSessionsHandler}
        data={props.data}
        show={modalShow}
        onHide={CloseAdd}
        courseTutors={props.courseTutors}
      />
    </div>
  );
}
