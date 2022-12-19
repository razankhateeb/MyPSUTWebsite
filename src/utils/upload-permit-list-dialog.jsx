import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ExcelRenderer } from "react-excel-renderer";

const UploadPermitListDialog = ({
  open,
  handleClose,
  retrieveExcelSheetData,
}) => {
  const [excelFile, setExcelFile] = useState(null);

  const handleUploadExcel = (e) => {
    let fileObj = e.target.files[0];
    console.log(fileObj);
    setExcelFile(fileObj);
  };

  const confirmUploadExcel = () => {
    if (excelFile === undefined || excelFile === null) return alert("please select a file ");
    ExcelRenderer(excelFile, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        retrieveExcelSheetData(resp.rows);
        handleClose();
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import Permit File</DialogTitle>
        <DialogContent>
          <div className="col-12">
            <DialogContentText>
              <label>
                <b>Select excel sheet you wish to import permits from</b>
              </label>
            </DialogContentText>
            <input
              type="file"
              placeholder="Filename"
              name="email"
              onChange={(e) => handleUploadExcel(e)}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => confirmUploadExcel()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadPermitListDialog;
