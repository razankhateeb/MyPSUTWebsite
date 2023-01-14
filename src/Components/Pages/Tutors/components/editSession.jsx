import {Modal} from "react-bootstrap";
import {useCallback, useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function EditSession(props) {
    const [courseId, setCourseId] = useState(props.data.course_id);
    const [tid, setTID] = useState(props.data.tutor_id);
    const [sessions, setSessions] = useState(props.data.sessions)


    const submitForm = async (event) => {
        // prevents default form as in prevents reload on submit
        event.preventDefault();


        //axios helps to send post
        await axios
            .post(`http://localhost:8000/update_course_details/?course_id=${courseId}&tutor_id=${tid}`, sessions, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    success();
                    resetForm();
                }
            })
            .catch((error) => {
                errormsg();
            });
    };

    const deleteSessionsHandler = useCallback(async (sid) => {
        let resopnse = await axios.post(`http://localhost:8000/delete_course_session/${sid}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        try {
            console.log(resopnse);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const resetForm = () => {
    };

    function filterByID(item) {
        if (item.course_id == courseId) {
            return item.tutors;
        }
    }


    return (<Modal
        show={props.show}
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>
                <h5>Edit Course Session</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="" className="form-container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Event Name">
                            <b>Course ID</b>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Position Name"
                            name="position"
                            value={courseId}
                            onChange={(e) => {
                                setCourseId(e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Main_Organizer">
                            <b>Tutor ID</b>
                        </label>
                        <select
                            className="form-select"
                            value={tid}
                            onChange={(e) => setTID(e.target.value)}
                        >
                            <option value={"Any"} disabled>
                                Any
                            </option>
                            {props.courseTutors.filter(filterByID).map((value) => value.tutors.map((tutor) => {
                                return (<option value={tutor.tutor_id}>
                                    {tutor.student_id} | {tutor.student_name}
                                </option>);
                            }))}
                        </select>
                    </div>
                    {sessions.map((value, index) => {
                        return (<>
                            {" "}
                            <div className="d-flex justify-content-between">
                                <h5>Session : {value.day} </h5>{" "}
                                <button
                                    className="project-btn-more"
                                    onClick={() => deleteSessionsHandler(value.session_id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} color="#ea6564"/>
                                </button>
                            </div>
                            <div className="col-sm-12 col-lg-6">
                                <label htmlFor="session day">
                                    <b>Day</b>
                                </label>
                                <select
                                    list="session_day"
                                    value={value.day}
                                    name="day"
                                    onChange={(e) => {
                                        const myNewSessions = [...sessions];
                                        const newSession = myNewSessions.find(a => a.session_id === value.session_id);
                                        newSession.day = e.target.value;
                                        setSessions(myNewSessions);
                                    }}
                                >
                                    <option value="none" selected disabled hidden>
                                        Select a Day
                                    </option>
                                    <option value={"S"}>Sunday</option>
                                    <option value={"M"}>Monday</option>
                                    <option value={"T"}>Tuesday</option>
                                    <option value={"W"}>Wednesday</option>
                                    <option value={"TH"}>Thursday</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-lg-6">
                                <label htmlFor="Start Timen">
                                    <b>Start Time</b>
                                </label>
                                <input
                                    type="time"
                                    placeholder="Enter Time"
                                    value={value.start_time}
                                    onChange={(e) => {
                                        const myNewSessions = [...sessions];
                                        const newSession = myNewSessions.find(a => a.session_id === value.session_id);
                                        newSession.start_time = e.target.value;
                                        setSessions(myNewSessions);
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
                                    value={value.end_time}
                                    onChange={(e) => {
                                        const myNewSessions = [...sessions];
                                        const newSession = myNewSessions.find(a => a.session_id === value.session_id);
                                        newSession.end_time = e.target.value;
                                        setSessions(myNewSessions);
                                    }}
                                />
                            </div>
                            <hr/>
                        </>);
                    })}

                    <div className="col-12">
                        <button type="button" className="btn" onClick={submitForm}>
                            Save Sessions
                        </button>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Toaster position="top-right" reverseOrder={true}/>
    </Modal>);
}
