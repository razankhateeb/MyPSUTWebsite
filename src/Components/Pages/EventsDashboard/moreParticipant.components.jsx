import {Modal} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import {useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function MoreParticipantsForm(props) {
    const [eventID, setEvent] = useState(props.event_id);
    const [image, setImage] = useState("");
    const [organizer, setOrganizer] = useState("");

    const submitForm = async (event) => {
        // prevents default form as in prevents reload on submit
        event.preventDefault();
        const request = new FormData();
        request.append("org_image", image);
        //axios helps to send post
        await axios
            .post(`http://localhost:8000/add_organizer_event?event_id=${eventID}&org_id=${organizer}`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    success();
                    props.onHide();
                    props.fetchEventHandler();
                }
            })
            .catch((error) => {
                errormsg();
            });
    };

    async function deleteOrgnizer(id, eventID) {
        await axios
            .post(`http://localhost:8000/delete_eve_organizer?org_id=${id}&event_id=${eventID}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    props.fetchEventHandler();
                }
            })
            .catch((error) => {
                errormsg();
            });
    }

    return (<Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>
                <h5>Edit Event Organizers</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-container">
                <div className="row">
                    <div className="row other-participants">
                        <div className="col-sm-12 ">
                            <label htmlFor="Main_Organizer">
                                <b>Event Organizers</b>
                            </label>

                            {props.event_organizers.map((value) => {


                                return (<div
                                    className="d-flex justify-content-between mb-3 align-items-center event-orgs">
                                    <div>
                                        <img
                                            width={50}
                                            height={50}
                                            className=""
                                            src={`http://localhost:8000/${value.organizer_image}`}
                                        ></img>
                                        <p className="d-inline">{value.organizer_name}</p>
                                    </div>
                                    <button
                                        className="project-btn-more"
                                        onClick={() => deleteOrgnizer(value.organizer_id, eventID)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} color="#ea6564"/>
                                    </button>
                                </div>);
                            })}
                        </div>
                        <p className="text-center">OR</p>
                        <div className="col-sm-12 ">
                            <label htmlFor="Main_Organizer">
                                <b>Add New Organizer</b>
                            </label>
                            <select
                                className="form-select"
                                onChange={(e) => {
                                    setOrganizer(e.target.value);
                                }}
                            >
                                <option value={"Any"} selected disabled>
                                    Any
                                </option>
                                {props.orgs.map((value) => {
                                    return (<option
                                        className="form-control"
                                        value={value.organizer_id}
                                    >
                                        {value.organizer_name}
                                    </option>);
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-lg-12">
                            <button type="button" className="btn" onClick={submitForm}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>);
}
