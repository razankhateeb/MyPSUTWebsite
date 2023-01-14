import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateClub(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    const request = new FormData();
    request.append("club_background_image", image);
    request.append("club_icon_image", icon);
    await axios
      .post(
        `http://localhost:8000/create_club?club_name=${name}&description=${description}&link=${link}&contact_info=${contact}`,
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
          props.fetchClubsHandler();
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
          <h5>Create New Club</h5>
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
                name="name"
                required
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
                required
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
                placeholder="Filename"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Create Club
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
