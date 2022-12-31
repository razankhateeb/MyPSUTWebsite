import { Modal } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function SelectParticipantForm(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    const request = new FormData();
    request.append("org_image", image);
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/create_Organizer?organizer_name=${name}`,
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
          <h5>Create New Organizer</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <div className="row">
            {/* <div className="grid-container">
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={stdAffairs}
                                 title="Deanship of Student Affairs" alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={admissionLogo}
                                 title="Deanship of Admissions and Registration" alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={engLogo}
                                 title="Training office" alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={arcLogo} alt={""}/>
                            <p></p>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={cyberSecurity} alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={acmLogo} alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={gsdc} alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={dart} alt={""}/>
                        </div>
                        <div className="grid-item">
                            <img className="img-fluid" width="120" height="120" src={ieee} alt={""}/>
                        </div>
                    </div> */}
            <div className="row other-participants">
              <div className="col-sm-12">
                <label for="Club Club Event Name">
                  <b>Organizer Name</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Participant Name"
                  name="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-12 ">
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
