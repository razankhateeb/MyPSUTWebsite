import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import EditForm from "../components/EditJob";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

            <button className="project-btn-more">
              <FontAwesomeIcon icon={faTrash} color="#ea6564" />
            </button>
          </div>
        </div>

        <div className="project-box-content-header">
          <img
            width={60}
            height={60}
            src={`http://localhost:8000/${props.image}`}
          ></img>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.position}</p>
          <p className="box-content-subheader">{props.company}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.major}</p>
          <p className="box-content-subheader">{props.desc}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.deadline}</p>
          <p className="box-content-subheader">{props.req}</p>
        </div>
      </div>
      <EditForm show={modalShow} onHide={() => setModalShow(false)} />
      {/* <SelectParticipantForm
        show={modalJobShow}
        onHide={() => setModalJobShow(false)}
      /> */}
    </div>
  );
}
