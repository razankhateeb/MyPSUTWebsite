import { Modal } from "react-bootstrap";
import stdAffairs from "../../../../img/stdAffairs.png";
import admissionLogo from "../../../../img/admissions.png";
import engLogo from "../../../../img/ENGlogo.png";
import arcLogo from "../../../../img/arc.jpg";
import cyberSecurity from "../../../../img/cyber Security.JPG";
import acmLogo from "../../../../img/acm.png";
import gsdc from "../../../../img/gsdc.JPG";
import dart from "../../../../img/dart.jpg";
import ieee from "../../../../img/ieee.jpg";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateEvent(props) {
  const [name, setName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    const request = new FormData();
    request.append("event_image", image);
    await axios
      .post(
        `http://localhost:8000/create_Event?event_name=${name}&location=${eventLocation}&start_date=${startDate}&end_date=${endDate}&start_time=${startTime}&end_time=${endTime}&description=${description}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
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
        <Modal.Title>
          <h5>Create New Event</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Name">
                <b>Event Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
                onChange={(e) => {
                  setEventLocation(e.target.value);
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
                name="email"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="Event Location">
                <b>Event Description</b>
              </label>
              <textarea rows="4"></textarea>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Event Image</b>
              </label>
              <input
                type="file"
                placeholder="Filename"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Main Organizer</b>
              </label>
              <select
                className="form-select"
                // value={product.productCategory}
                // onChange={(evt) =>
                //   setProduct({ ...product, productCategory: evt.target.value })
                // }
              >
                <option value={"Books"}>Books</option>
                <option value={"Furniture"}>Furniture</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"Mobile"}>Mobile</option>
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="EventDate">
                <b>Event Start Date</b>
              </label>
              <input
                className="datepicker"
                type="date"
                placeholder="Enter Start Date"
                name="email"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="EventDate">
                <b>Event End Date</b>
              </label>
              <input
                className="datepicker"
                type="date"
                placeholder="Enter End Date"
                name="email"
                required
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Timen">
                <b>Start Time</b>
              </label>
              <input
                type="time"
                placeholder="Enter Time"
                onChange={(e) => {
                  setStartTime(e.target.value);
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
                  setEndTime(e.target.value);
                }}
              />
            </div>

            {/* <div className="form-container">
              <div className="row">
                <div className="grid-container">
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={stdAffairs}
                      title="Deanship of Student Affairs"
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={admissionLogo}
                      title="Deanship of Admissions and Registration"
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={engLogo}
                      title="Training office"
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={arcLogo}
                      alt={""}
                    />
                    <p></p>
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={cyberSecurity}
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={acmLogo}
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={gsdc}
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={dart}
                      alt={""}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      className="img-fluid"
                      width="120"
                      height="120"
                      src={ieee}
                      alt={""}
                    />
                  </div>
                </div>
              </div>
            </div> */}

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
