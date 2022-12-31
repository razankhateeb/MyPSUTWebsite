import { Modal } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

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
      .post(
        `http://localhost:8000/add_organizer_event?event_id=${eventID}&org_id=${organizer}`,
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
          props.onHide();
          props.fetchJobsHandler();
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
          <h5>Add Another Organizer</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <div className="row">
            <div className="row other-participants">
              <div className="col-sm-12 ">
                <label htmlFor="Main_Organizer">
                  <b>Organizer Name</b>
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
                    return (
                      <option
                        className="form-control"
                        value={value.organizer_id}
                      >
                        {value.organizer_name}
                      </option>
                    );
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
    </Modal>
  );
}
