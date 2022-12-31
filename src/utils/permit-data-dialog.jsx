import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const PermitDataDialog = ({ open, handleClose, selectedPermit, data }) => {
  useEffect(() => {
    console.log(selectedPermit);
  }, [selectedPermit]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Permit Details</DialogTitle>
        <DialogContent>
          <DialogContentText className="form-container" component={"span"}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Permit Number</b>
                </label>
                <input
                  type="number"
                  placeholder={data.permit_number}
                  name="email"
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Permit Type</b>
                </label>
                <input
                  type="Text"
                  placeholder={data.colleage}
                  name="email"
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Student Name</b>
                </label>
                <input
                  type="text"
                  placeholder={data.student_name}
                  name="email"
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Student Contact Number</b>
                </label>
                <input
                  type="number"
                  name="email"
                  defaultValue={data.phone_number}
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Licsence Plate</b>
                </label>
                <input
                  name="email"
                  placeholder={data.license_number}
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Car Type</b>
                </label>
                <input type="text" disabled placeholder={data.car_type} />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Car Model</b>
                </label>
                <input type="text" placeholder={data.car_color} />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PermitDataDialog;
