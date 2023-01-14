import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function CreateClubEvent(props) {
  const [name, setName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [organizer, setOrganizer] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    const request = new FormData();
    request.append("event_image", image);
    request.append("organizers", organizer);
    await axios
      .post(
        `http://localhost:8000/create_Event?event_name=${name}&location=${eventLocation}&start_date=${startDate}&end_date=${endDate}&start_time=${startTime}&end_time=${endTime}&description=${description}`,
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
          props.fetchEventHandler();
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
                placeholder="Enter Event Name"
                name="event_name"
                required
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
                placeholder="Enter Event Location"
                name="location"
                required
                onChange={(e) => {
                  setEventLocation(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="Event_Description">
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
              <label htmlFor="Event_Image">
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
              <label htmlFor="Main_Organizer">
                <b>Main Organizer</b>
              </label>
              <select
                className="form-select"
                onChange={(e) => setOrganizer(e.target.value)}
              >
                <option value={"Any"} selected disabled>
                  Any
                </option>
                {props.organizers.map((value) => {
                  return (
                    <option value={value.organizer_id}>
                      {value.organizer_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event_startDate">
                <b>Event Start Date</b>
              </label>
              <input
                className="datepicker"
                type="date"
                placeholder="Enter Start Date"
                name="start_date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event_endDate">
                <b>Event End Date</b>
              </label>
              <input
                className="datepicker"
                type="date"
                placeholder="Enter End Date"
                name="end_date"
                required
                onChange={(e) => {
                  setEndDate(e.target.value);
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
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="End Time">
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

            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Create Event
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Toaster position="top-right" reverseOrder={true} />
    </Modal>
  );
}
