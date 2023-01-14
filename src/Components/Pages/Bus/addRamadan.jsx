import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function AddRamadan(props) {
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    const request = new FormData();
    request.append("bus_image", image);
    //axios helps to send post
    await axios
      .post(`http://localhost:8000/upload_image_bus_route_ramadan`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          success();
          props.onHide();
        }
      })
      .catch((error) => {
        errormsg();
      });
  };

  return (
    <Modal
      show={props.show}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Add New Ramadan Bus Route Timing Image</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="Start Time">
                <b>Route Image</b>
              </label>
              <input
                type="file"
                placeholder="Filename"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                required
              />
            </div>

            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Upload
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Toaster position="top-right" reverseOrder={true} />
    </Modal>
  );
}
