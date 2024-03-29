import {Modal} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateSession(props) {
    const [courseId, setCourseId] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [day, setDay] = useState("");
    const [student, setStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    function filterByID(item) {
        if (item.course_id == courseId) {
            return item.tutors;
        }
    }


    const submitForm = async (event) => {
        // prevents default form as in prevents reload on submit
        event.preventDefault();
        //axios helps to send post
        await axios
            .post(`http://localhost:8000/Create_Course_Session?course_id=${courseId}&day=${day}&start_time=${start}&end_time=${end}&tutor_id=${student}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    success();
                    props.onHide();
                    props.fetchSessionsHandler();
                }
            })
            .catch((error) => {
                errormsg();
            });
    };

    const resetForm = () => {
    };

    return (<Modal
        show={props.show}
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>
                <h5>Add New Course Session</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="" className="form-container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Main_Organizer">
                            <b>Course ID </b>
                        </label>
                        <select
                            className="form-select"
                            onChange={(e) => setCourseId(e.target.value)}
                        >
                            <option value={"Any"} selected disabled>
                                Any
                            </option>
                            {props.courseTutors.map((value) => {
                                return (<option value={value.course_id}>
                                    {value.course_id} | {value.course_name}
                                </option>);
                            })}
                        </select>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Main_Organizer">
                            <b>Tutor ID</b>
                        </label>
                        <select
                            className="form-select"
                            onChange={(e) => setStudent(e.target.value)}
                        >
                            <option value={"Any"} selected disabled>
                                Any
                            </option>
                            {props.courseTutors.filter(filterByID).map((value) => value.tutors.map((tutor) => {
                                return (<option value={tutor.tutor_id}>
                                    {tutor.student_id} | {tutor.student_name}
                                </option>);
                            }))}
                        </select>
                    </div>

                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Event Name">
                            <b>Day</b>
                        </label>
                        <select
                            list="major_list"
                            value={day}
                            name="major"
                            onChange={(e) => {
                                setDay(e.target.value);
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
                            onChange={(e) => {
                                setStart(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Start Time">
                            <b>End Time</b>
                        </label>
                        <input
                            type="time"
                            placeholder="Enter Time"
                            required
                            onChange={(e) => {
                                setEnd(e.target.value);
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <button type="button" className="btn" onClick={submitForm}>
                            Create Session
                        </button>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Toaster position="top-right" reverseOrder={true}/>
    </Modal>);
}
