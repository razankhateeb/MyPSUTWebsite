import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import "../CSS/tutors.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
      console.log(resopnse);
      props.fetchJobsHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.date}</span>
          <div className="more-wrapper">
            <button
              className="project-btn-more"
              onClick={() => setModalShow(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            {/* <button
              className="project-btn-more"
              onClick={() => deleteSessionsHandler(props.c_s_id)}
            >
              <FontAwesomeIcon icon={faTrash} color="#ea6564" />
            </button> */}
          </div>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.course_name}</p>
          <p className="box-content-subheader">{props.cid}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.std_name}</p>
          <p className="box-content-subheader">{props.std_id}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">Sessions</p>
          <p className="box-content-subheader">
            {props.sessions.map((value) => {
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
        data={props}
        show={modalShow}
        onHide={CloseAdd}
      />
    </div>
  );
}
