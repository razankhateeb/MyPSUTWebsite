import {Modal} from "react-bootstrap";
import {toast} from "react-hot-toast";
import {useState} from "react";
import axios from "axios";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function EditClub(props) {
    const [name, setName] = useState(props.data.club_name);
    const [link, setLink] = useState(props.data.link);
    const [description, setDescription] = useState(props.data.description);
    const [contact, setContact] = useState(props.data.contact_info);
    const [image, setImage] = useState("");
    const [icon, setIcon] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();
        const request = new FormData();
        request.append("club_background_image", image);
        request.append("club_icon_image", icon);
        await axios
            .post(
                `http://localhost:8000/update_club/${props.data.club_id}?club_name=${name}&description=${description}&link=${link}&contact_info=${contact}`,
                request,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    success();
                    props.onHide()
                    props.fetchClubsHandler()
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
                <Modal.Title>
                    <h5>Edit Club</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="" className="form-container">
                    <div className="row">
                        <div className="col-sm-12">
                            <label htmlFor="Event Name">
                                <b>Club Name</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Club Name"
                                value={name}
                                name="name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-sm-12">
                            <label htmlFor="Club Description">
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
                            <label htmlFor="Event Location">
                                <b>Registration Link</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Registration Link"
                                name="reg link"
                                value={link}
                                defaultValue={""}
                                onChange={(e) => {
                                    setLink(e.target.value);
                                }}
                            />
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Event Location">
                                <b>Club Contact Link</b>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter club contact Link"
                                name="reg link"
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value);
                                }}
                            />
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Start Time">
                                <b>Club Icon Image</b>
                            </label>
                            <input
                                type="file"
                                placeholder="Filename"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(e) => {
                                    setIcon(e.target.files[0]);
                                }}
                            />
                        </div>

                        <div className="col-sm-12 col-lg-6">
                            <label htmlFor="Start Time">
                                <b>Club Background Image</b>
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

                        <div className="col-12">
                            <button type="button" className="btn" onClick={submitForm}>
                                Create Event
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
