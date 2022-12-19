import {Modal} from "react-bootstrap";
import "./CSS/editform.styles.css"

export default function EditForm(props) {
    return (
        <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Event
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="" className="form-container">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="Event Name"><b>Event Name</b></label>
                        <input type="text" placeholder="Enter Email" name="email" required/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Event Location"><b>Event Location</b></label>
                        <input type="text" placeholder="Enter Location" name="email" required/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="EventDate"><b>Event Date</b></label>
                        <input className="datepicker" type="date" placeholder="Enter Date" name="email" required/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Start Timen"><b>Start Time</b></label>
                        <input type="time" placeholder="Enter Time" required/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Start Time"><b>End Time</b></label>
                        <input type="time" placeholder="Enter Time" required/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <label htmlFor="Start Time"><b>Event Image</b></label>
                        <input type="file" placeholder="Filename"/>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <button type="button" className="btn">Save</button>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <button type="button" className="btn cancel" onClick="closeEdit()">
                            Delete Event
                        </button>
                    </div>
                </div>
            </form>
        </Modal.Body>

    </Modal>);
}