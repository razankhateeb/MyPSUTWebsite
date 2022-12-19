import './CSS/event.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import cyberSecurity from "../../../img/cyber Security.JPG";
import dsc from "../../../img/dsc.jpg";
import {useState} from "react";
import EditForm from "./EditForm.components";
import SelectParticipantForm from "./selectParticipant.components";
import "./CSS/event.css"


export default function ProjectBox(props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalClubShow, setModalClubShow] = useState(false);


    return <>
        <div className="project-box-wrapper">
            <div className="project-box">
                <div className="project-box-header">
                    <span>{props.date}</span>
                    <div className="more-wrapper">

                        <button className="project-btn-more"
                                onClick={() => setModalShow(true)}>
                            <FontAwesomeIcon icon={faPen}/>
                        </button>
                    </div>
                </div>
                <div className="project-box-content-header">
                    <p className="box-content-header">{props.eventName}</p>
                    <p className="box-content-subheader">
                        {props.description}
                    </p>
                </div>
                <div className="project-box-footer">
                    <div className="participants">
                        {/*TODO Loop On Images*/}
                        <img src={cyberSecurity} alt="profile"/>
                        <img src={dsc} alt="profile"/>
                        <button className="open-button add-participant" onClick={() => setModalClubShow(true)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                    <div
                        className="days-left">{props.startTime.toString().slice(0, 5)} {parseInt(props.startTime) > 12 ? 'PM' : 'AM'} - {props.endTime.toString().slice(0, 5)} {parseInt(props.startTime) > 12 ? 'PM' : 'AM'}</div>
                </div>
            </div>
        </div>
        <EditForm
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        <SelectParticipantForm show={modalClubShow}
                               onHide={() => setModalClubShow(false)}/>
    </>
}