import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import EditFormEventClub from "../Components/EditFormEventClub.components";
import MoreClubs from "../Components/moreClubs.components";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CardProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalClubShow, setModalClubShow] = useState(false);
  const deleteEventHandler = useCallback(async (event_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_event/${event_id}`,
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
            {/* <span>{props.data.start_date}</span> */}
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">Event Name</p>
            <p className="box-content-subheader">{props.data.event_name}</p>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">Event Date</p>
            <p className="box-content-subheader">
              {props.data.start_date}-{props.data.end_date}
            </p>
          </div>
          <div className="project-box-footer  d-flex flex-row gap-5">
            <div>
              <div className="participants">
                {props.data.organizers.map((org) => (
                  <img
                    src={`http://localhost:8000/${org.organizer_image}`}
                    alt="profile image"
                  />
                ))}
                <button
                  className="open-button add-participant"
                  onClick={() => setModalClubShow(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="days-left">
                {props.data.start_time.toString().slice(0, 5)}{" "}
                {parseInt(props.start_time) > 12 ? "PM" : "AM"} -{" "}
                {props.data.end_time.toString().slice(0, 5)}{" "}
                {parseInt(props.data.end_time) > 12 ? "PM" : "AM"}
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
                onClick={() => deleteEventHandler(props.data.event_id)}
              >
                <FontAwesomeIcon icon={faTrash} color="#ea6564" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditFormEventClub
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={props.data}
        organizers={props.data.organizers}
        clubs={props.clubs}
      />
      <MoreClubs
        show={modalClubShow}
        onHide={() => setModalClubShow(false)}
        organizers={props.data.organizers}
        clubs={props.clubs}
        event_id={props.data.event_id}
        fetchClubsEventsHandler={props.fetchClubsEventsHandler}
      />
    </>
  );
}
