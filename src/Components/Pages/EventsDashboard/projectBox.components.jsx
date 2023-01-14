import "./CSS/event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import cyberSecurity from "../../../img/cyber Security.JPG";
import dsc from "../../../img/dsc.jpg";
import { useCallback, useState } from "react";
import EditForm from "./EditForm.components";
import MoreParticipantsForm from "./moreParticipant.components";
import "./CSS/event.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ProjectBox(props) {
  function CloseEdit() {
    setModalShow(false);
  }
  const [modalShow, setModalShow] = useState(false);
  const [modalClubShow, setModalClubShow] = useState(false);
  const deleteEventHandler = useCallback(async (event_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_event${event_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      console.log(resopnse);
      props.fetchEventHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <div className="project-box-wrapper">
        <div className="project-box">
          <div className="project-box-header">
            <span>{props.date}</span>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">Event Name</p>
            <p className="box-content-subheader">{props.name}</p>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">Event Location</p>
            <p className="box-content-subheader">{props.location}</p>
          </div>
          <div className="project-box-footer d-flex flex-row gap-5">
            <div>
              <div className="participants">
                {props.organizers.map((value) => {
                  return (
                    <img
                      width={5}
                      height={5}
                      src={`http://localhost:8000/${value.organizer_image}`}
                    ></img>
                  );
                })}

                <button
                  className="open-button add-participant"
                  onClick={() => setModalClubShow(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="days-left">
                {props.sTime.toString().slice(0, 5)}{" "}
                {parseInt(props.sTime) > 12 ? "PM" : "AM"} -{" "}
                {props.eTime.toString().slice(0, 5)}{" "}
                {parseInt(props.eTime) > 12 ? "PM" : "AM"}
              </div>
            </div>
            <div className="d-flex flex-column">
              <button
                className="project-btn-more"
                onClick={() => setModalShow(true)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="project-btn-more"
                onClick={() => deleteEventHandler(props.id)}
              >
                <FontAwesomeIcon icon={faTrash} color="#ea6564" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditForm
        show={modalShow}
        onHide={CloseEdit}
        data={props}
        fetchEventHandler={props.fetchEventHandler}
        orgs={props.org_list}
      />
      <MoreParticipantsForm
        show={modalClubShow}
        onHide={() => setModalClubShow(false)}
        orgs={props.org_list}
        event_id={props.id}
        fetchEventHandler={props.fetchEventHandler}
        event_organizers={props.organizers}
      />
    </>
  );
}
