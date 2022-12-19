import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";

import EditJob from "./EditJob";

export default function JobsProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalJobShow, setModalJobShow] = useState(false);

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
          </div>
        </div>

        <div className="project-box-content-header">
          <img
            width={60}
            height={60}
            src={require("../../../../img/" + props.list.image)}
          ></img>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">position</p>
          <p className="box-content-subheader">id</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">company</p>
          <p className="box-content-subheader">location</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">major</p>
          <p className="box-content-subheader">level</p>
        </div>
      </div>
      <EditJob show={modalShow} onHide={() => setModalShow(false)} />
      {/* <SelectParticipantForm
        show={modalJobShow}
        onHide={() => setModalJobShow(false)}
      /> */}
    </div>
  );
}
