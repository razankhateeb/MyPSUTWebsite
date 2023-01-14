import {Modal} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../../EventsDashboard/CSS/editform.styles.css";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function EditFormEventClub(props) {
    const [name, setName] = useState(props.data.name);
    const [location, setLoctation] = useState(props.data.location);
    const [sDate, setSDate] = useState(props.data.start_date);
    const [eDate, setEDate] = useState(props.data.end_date);
    const [sTime, setSTime] = useState(props.data.start_time);
    const [eTime, setETime] = useState(props.data.end_time);
    const [description, setDescription] = useState(props.data.description);
    const [image, setImage] = useState("");

    const submitForm = async (event) => {
        // prevents default form as in prevents reload on submit
        event.preventDefault();
        const request = new FormData();
        request.append("event_image", image);

        //axios helps to send post
        await axios
            .post(
                `http://localhost:8000/update_event/${props.data.event_id}?event_name=${name}&location=${location}&start_date=${sDate}&end_date=${eDate}&start_time=${sTime}&end_time=${eTime}&description=${description}`,
                request,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    props.fetchJobsHandler();
                    props.onHide();
                    success();
                }
            })
            .catch((error) => {
                errormsg();
            });
    };

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="src/Components/Pages/ClubsDashboard/Components" className="form-container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Event Name">
                                <b>Event Name</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Event Name"
                                name="name"
                                value={props.data.event_name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Event Location">
                                <b>Event Location</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Location"
                                name="location"
                                value={location}
                                onChange={(e) => {
                                    setLoctation(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="Event_Description">
                                <b>Event Description</b>
                            </label>
                            <textarea
                                rows="4"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Start Time">
                                <b>Event Image</b>
                            </label>
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                placeholder="Filename"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}
                            />
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="EventDate">
                                <b>Event Start Date</b>
                            </label>
                            <input
                                className="Start Date"
                                type="date"
                                placeholder="Enter Date"
                                name="sdate"
                                value={props.data.start_date}
                                onChange={(e) => {
                                    setSDate(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="EventDate">
                                <b>Event End Date</b>
                            </label>
                            <input
                                className="end Date"
                                type="date"
                                placeholder="Enter Date"
                                name="edate"
                                value={props.data.end_date}
                                onChange={(e) => {
                                    setEDate(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Start Time">
                                <b>Start Time</b>
                            </label>
                            <input
                                type="time"
                                placeholder="Enter Time"
                                value={props.data.start_time}
                                onChange={(e) => {
                                    setSTime(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Start Time">
                                <b>End Time</b>
                            </label>
                            <input
                                type="time"
                                placeholder="Enter Time"
                                value={props.data.end_time}
                                onChange={(e) => {
                                    setETime(e.target.value);
                                }}
                            />
                        </div>

                        <div className="col-sm-12">
                            <button type="button" className="btn" onClick={submitForm}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
