import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const PDFDialog = ({open, handleClose}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Import Route PDF</DialogTitle>
                <DialogContent>
                    <div class="col-12">
                        <DialogContentText>
                            <label>
                                <b>Select excel sheet you wish to import Route PDF from</b>
                            </label>
                        </DialogContentText>
                        <input type="file" placeholder="Filename" name="email"/>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PDFDialog;
