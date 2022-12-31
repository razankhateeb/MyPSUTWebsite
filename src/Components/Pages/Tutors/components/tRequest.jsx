import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import "../CSS/tutors.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback } from "react";

export default function TRequest(props) {
  // console.log(props.fetchCourseRequestHandler);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.date}</span>
          <div className="more-wrapper">
            <button
              type="button"
              className="btn-state"
              onClick={() => props.accept(props.tid)}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn-state reject"
              onClick={() => props.decline(props.tid)}
            >
              Decline
            </button>
          </div>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.s_name}</p>
          <p className="box-content-subheader">{props.sid}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.course_name}</p>
          <p className="box-content-subheader">{props.cid}</p>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.semester}</p>
          <p className="box-content-subheader">{props.grade}</p>
        </div>
      </div>
    </div>
  );
}
