import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ExcelRenderer } from "react-excel-renderer";
import axios from "axios";

const UploadPermitListDialog = ({
  open,
  handleClose,
  retrieveExcelSheetData,
  fetchPermitHandler,
}) => {
  const [excelFile, setExcelFile] = useState(null);

  const handleUploadExcel = (e) => {
    let fileObj = e.target.files[0];
    console.log(fileObj);
    setExcelFile(fileObj);
  };

  const confirmUploadExcel = async () => {
    if (excelFile === undefined || excelFile === null)
      return alert("please select a file ");

    // using Java Script method to get PDF file
    const request = new FormData();
    request.append("file", excelFile);
    await axios
      .post(`http://localhost:8000/upload_permit_holders`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchPermitHandler();
          handleClose();
          // success();
          // props.onHide();
          // props.fetchUsersHandler();
        }
      })
      .catch((error) => {
        // errormsg();
      });
    // ExcelRenderer(excelFile, (err, resp) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     retrieveExcelSheetData(resp.rows);
    //     handleClose();
    //   }
    // });
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
