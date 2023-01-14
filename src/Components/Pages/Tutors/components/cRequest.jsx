import { useState } from "react";
import "../CSS/tutors.css";
import ApproveCourseModal from "./approveCourseModal";

export default function CRequests(props) {
  const [modalShow, setModalShow] = useState(false);

  function CloseAdd() {
    setModalShow(false);
  }

  const acceptReq = () => {
    setModalShow(true);
  };

  const [organizer, setOrganizer] = useState("");

  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.date}</span>
          <div className="more-wrapper">
            <button type="button" className="btn-state" onClick={acceptReq}>
              Approve
            </button>
            <button
              type="button"
              className="btn-state reject"
              onClick={() => props.decline(props.id)}
            >
              Decline
            </button>
          </div>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">Course ID</p>
          <p className="box-content-subheader">{props.id}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">Course Name</p>
          <p className="box-content-subheader">{props.course_name}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">Number of Requests</p>
          <p className="box-content-subheader">{props.total}</p>
        </div>
      </div>
      <ApproveCourseModal
        show={modalShow}
        onHide={CloseAdd}
        c_id={props.id}
        id={props.id}
        courseTutors={props.courseTutors}
        fetchCourseRequestHandler={props.fetchCourseRequestHandler}
      ></ApproveCourseModal>
    </div>
  );
}
