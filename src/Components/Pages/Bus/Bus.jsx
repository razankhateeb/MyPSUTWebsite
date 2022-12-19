import React, { useRef, useState } from "react";
import "./Bus.css";
import PDFDialog from "../../../utils/pdf-dialog";
import NewRouteDialog from "../../../utils/new-route-dialog";
import { Link } from "react-router-dom";
import {
  faCircleXmark,
  faClock,
  faShareFromSquare,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadBusStudentListDialog from "../../../utils/upload-bus-student-list-dialog";
import RoutePdfViewer from "../../../utils/route-pdf-viewer";
import { CSVLink } from "react-csv";
import {
  faBusSimple,
  faCircle,
  faHouse,
  faListUl,
  faPlus,
  faShareAltSquare,
} from "@fortawesome/free-solid-svg-icons";

const Bus = () => {
  const [open, setOpen] = useState(false);
  const [newRouteDialogOpen, setNewRouteDialogOpen] = useState(false);
  const [busStudentDialongOpen, setBusStudentDialogOpen] = useState(false);
  const [busTimePdfDialog, setBusTimePdfDialogOpen] = useState(false);
  const [file, setFile] = useState([]);

  const [busStudentsList, setBusStudentsList] = useState([]);
  const [excelExportData, setExcelExportData] = useState([]);

  const inputFile = useRef(null);

  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewRouteDialogOpen = () => {
    setNewRouteDialogOpen(true);
  };

  const handleNewRouteDialogClose = () => {
    setNewRouteDialogOpen(false);
  };

  const handleBusStudentDialogClose = () => {
    setBusStudentDialogOpen(false);
  };

  const handleBusStudentDialogOpen = () => {
    setBusStudentDialogOpen(true);
  };

  const retrieveExcelSheetData = (data) => {
    let tempArr = [];
    data.forEach((element) => {
      tempArr.push(element);
    });
    data.splice(0, 1);
    setExcelExportData(tempArr);
    setBusStudentsList(data);
  };

  const handleBusTimePdfDialogClose = () => {
    setBusTimePdfDialogOpen(false);
  };

  const handleBusTimePdfDialogOpen = () => {
    setBusTimePdfDialogOpen(true);
  };

  return (
    <div className="container app-body">
      <nav className="app-sidebar">
        <div className="container-fluid">
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link to="/" className="nav-link app-sidebar-link active">
                  <i>
                    <FontAwesomeIcon icon={faHouse} />
                  </i>
                </Link>
              </li>
              <li className="nav-item" onClick={handleBusStudentDialogOpen}>
                <a className="nav-link app-sidebar-link">
                  <FontAwesomeIcon icon={faSquarePlus} size="2x" />
                  <input
                    hidden
                    type="file"
                    onChange={handleChange}
                    ref={inputFile}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main role="main" className="pb-3 page-main">
        <button className="messages-btn">
          <i className="fa-solid fa-bus-simple">
            <FontAwesomeIcon icon={faBusSimple} />
          </i>
        </button>
        <div className="app-list">
          <div className="projects-section">
            <div className="projects-section-header">
              <p>Bus Students</p>
              <div className="view-actions">
                <button className="view-btn list-view active" title="List View">
                  <i className="fa-solid fa-list-ul">
                    <FontAwesomeIcon icon={faListUl} />
                  </i>
                </button>

                {busStudentsList.length !== 0 ? (
                  <CSVLink
                    style={{ textDecoration: "none" }}
                    data={excelExportData}
                    filename={"bus-excel-data.csv"}
                  >
                    <button className="view-btn grid-view" title="Export">
                      <i className="fa-regular fa-share-from-square">
                        <FontAwesomeIcon icon={faShareAltSquare} />
                      </i>
                    </button>
                  </CSVLink>
                ) : null}
              </div>
            </div>
            <div className="projects-section-line"></div>
            <div className="project-boxes jsListView">
              {busStudentsList.length !== 0
                ? busStudentsList.map((item, index) => (
                    <div className="project-box-wrapper " key={index}>
                      <div className="row bus-project-box justify-content-center">
                        <div className="col-2">
                          <div className="row box-content-header">
                            Routename{" "}
                          </div>
                          <div className="row"> {item[5]}</div>
                        </div>
                        <div className="col-3">
                          <div className="row box-content-header">
                            Student Name{" "}
                          </div>
                          <div className="row"> {item[7]}</div>
                        </div>
                        <div className="col-3">
                          <div className="row box-content-header">M/W </div>
                          <div className="row"> Trip A : {item[1]}</div>
                          <div className="row"> Trip B : {item[0]}</div>
                        </div>
                        <div className="col-2">
                          <div className="row box-content-header"> S/T/TH</div>
                          <div className="row" style={{ whiteSpace: "noWrap" }}>
                            {" "}
                            Trip A : {item[3]}
                          </div>
                          <div className="row" style={{ whiteSpace: "noWrap" }}>
                            {" "}
                            Trip B : {item[2]}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : " No Data Loaded "}
            </div>
          </div>
          <div className="messages-section">
            <div className="projects-section-header">
              <p>Time</p>
              <div className="d-flex">
                <button
                  className="add-btn"
                  title="Add New Project"
                  onClick={handleNewRouteDialogOpen}
                ></button>
                <button className="messages-close">
                  <i className="fa-regular fa-circle-xmark">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </i>
                </button>
              </div>
            </div>
            <div className="messages">
              <div
                className="message-box justify-content-between"
                onClick={handleBusTimePdfDialogOpen}
              >
                <div className="d-flex">
                  <i className="fa-solid fa-clock">
                    {" "}
                    <FontAwesomeIcon icon={faClock} />
                  </i>
                  <div className="message-content">
                    <div className="message-header">
                      <div className="name">Academic Time</div>
                    </div>
                  </div>
                </div>

                <div>
                  <i className="fa-solid fa-plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                </div>
              </div>

              <div
                className="message-box justify-content-between"
                onClick={handleBusTimePdfDialogOpen}
              >
                <div className="d-flex">
                  <i className="fa-solid fa-clock">
                    <FontAwesomeIcon icon={faClock} />
                  </i>
                  <div className="message-content">
                    <div className="message-header">
                      <div className="name">Ramadan Time</div>
                    </div>
                  </div>
                </div>

                <div>
                  <i className="fa-solid fa-plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                </div>
              </div>
            </div>
            <NewRouteDialog
              open={newRouteDialogOpen}
              handleClose={handleNewRouteDialogClose}
            />
            <UploadBusStudentListDialog
              open={busStudentDialongOpen}
              handleClose={handleBusStudentDialogClose}
              retrieveExcelSheetData={retrieveExcelSheetData}
            />
            <RoutePdfViewer
              open={busTimePdfDialog}
              handleClose={handleBusTimePdfDialogClose}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Bus;
