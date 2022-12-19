import CyberSecurityIcon from "../../../../img/cyber Security.JPG";
import dsc from "../../../../img/dsc.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import EditForm from "../../EventsDashboard/EditForm.components";
import SelectParticipantForm from "../../EventsDashboard/selectParticipant.components";

export default function CardProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalClubShow, setModalClubShow] = useState(false);

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
          <p className="box-content-header">{props.eventName}</p>
          <p className="box-content-subheader">{props.clubName}</p>
        </div>

        <div className="project-box-footer">
          <div className="participants">
            <img src={CyberSecurityIcon} alt="profile image" />
            <img src={dsc} alt="profile image" />
            <button
              className="open-button add-participant"
              onClick={() => setModalClubShow(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="days-left">
            {props.startTime.toString().slice(0, 5)}{" "}
            {parseInt(props.startTime) > 12 ? "PM" : "AM"} -{" "}
            {props.endTime.toString().slice(0, 5)}{" "}
            {parseInt(props.startTime) > 12 ? "PM" : "AM"}
          </div>
        </div>
      </div>
      <EditForm show={modalShow} onHide={() => setModalShow(false)} />
      <SelectParticipantForm
        show={modalClubShow}
        onHide={() => setModalClubShow(false)}
      />
    </div>
  );
}
