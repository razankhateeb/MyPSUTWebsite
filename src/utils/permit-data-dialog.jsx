import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const PermitDataDialog = ({ open, handleClose, selectedPermit }) => {
  useEffect(() => {
    console.log(selectedPermit);
  }, [selectedPermit]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Permit Details</DialogTitle>
        <DialogContent>
          <DialogContentText className="form-container" component={'span'}>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Permit Number</b>
                </label>
                <input
                  type="number"
                  placeholder="273"
                  defaultValue={selectedPermit[6]}
                  name="email"
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Permit Type</b>
                </label>
                <input type="Text" placeholder="IT" name="email" disabled />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Student Name</b>
                </label>
                <input
                  type="text"
                  placeholder="Student Name"
                  defaultValue={selectedPermit[5]}
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
                  placeholder="0790872936"
                  name="email"
                  defaultValue={selectedPermit[0]}
                  disabled
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Licsence Plate</b>
                </label>
                <input
                  type="number"
                  placeholder="36-51923"
                  name="email"
                  defaultValue={selectedPermit[2]}
                  required
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Car Type</b>
                </label>
                <input
                  type="text"
                  placeholder="Toyota"
                  required
                  defaultValue={selectedPermit[3]}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <label>
                  <b>Car Model</b>
                </label>
                <input type="text" placeholder="Camry" required />
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
