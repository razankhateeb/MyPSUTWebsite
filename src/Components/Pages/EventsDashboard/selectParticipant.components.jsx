import { Modal } from "react-bootstrap";
import stdAffairs from "../../../img/stdAffairs.png";
import engLogo from "../../../img/ENGlogo.png";
import arcLogo from "../../../img/arc.jpg";
import acmLogo from "../../../img/acm.png";
import cyberSecurity from "../../../img/cyber Security.JPG";
import admissionLogo from "../../../img/admissions.png";
import gsdc from "../../../img/gsdc.JPG";
import dart from "../../../img/dart.jpg";
import ieee from "../../../img/ieee.jpg";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SelectParticipantForm(props) {
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
                />
              </div>
              <div className="col-sm-12 ">
                <label htmlFor="Start Time">
                  <b>Event Image</b>
                </label>
                <input
                  type="file"
                  placeholder="Filename"
                  // onChange={(e) => {
                  //   setImage(e.target.files[0]);
                  // }}
                />
              </div>
              {/* <div className="col-sm-4 col-lg-2">
                <div className="add-participant-image">
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-12">
                <button type="button" className="btn">
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
