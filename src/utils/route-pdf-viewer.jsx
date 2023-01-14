import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {Document, Page} from "react-pdf/dist/esm/entry.webpack5";

const RoutePdfViewer = ({open, handleClose}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber] = useState(1);

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(1);
    };

    /* const goToPrevPage = () =>
      setPageNumber((state) => ({ pageNumber: pageNumber - 1 }));
    const goToNextPage = () =>
      setPageNumber((state) => ({ pageNumber: pageNumber + 1 }));
  */
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Academic Time</DialogTitle>
                <DialogContent>
                    <div style={{width: 600}}>
                        <Document file="/bus.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} width={600}/>
                        </Document>
                    </div>

                    <p>
                        Page {pageNumber} of {numPages}
                    </p>


                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RoutePdfViewer;
