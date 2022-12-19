import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import "../CSS/tutors.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import CreateSession from "./addSession";

export default function TutoringMainProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);

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

            <button className="project-btn-more">
              <FontAwesomeIcon icon={faTrash} color="#ea6564" />
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <img
            width={60}
            height={60}
            src={`http://localehost:8000/${props.image}`}
          ></img>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.course_name}</p>
          <p className="box-content-subheader">{props.key}</p>
        </div>
        {/* <div className="project-box-content-header">
          <p className="box-content-header">{props.major}</p>
          <p className="box-content-subheader">{props.desc}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.deadline}</p>
          <p className="box-content-subheader">{props.req}</p>
        </div> */}
      </div>
      {/* <EditForm show={modalShow} onHide={() => setModalShow(false)} /> */}
      {/* <CreateSession
        show={modalJobShow}
        onHide={() => setModalJobShow(false)}
      /> */}
    </div>
  );
}
