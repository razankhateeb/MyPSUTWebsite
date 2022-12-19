import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Permit.css";
import UploadPermitListDialog from "../../../utils/upload-permit-list-dialog";
import PermitDataDialog from "../../../utils/permit-data-dialog";
import { CSVLink } from "react-csv";
import {
  faEllipsisV,
  faHouse,
  faListUl,
  faShareFromSquare,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const Permit = () => {
  const [permitDialogOpen, setPermitDialogOpen] = useState(false);
  const [permitDataDialogOpen, setPermitDataDialogOpen] = useState(false);
  const [permitNbr, setPermitNbr] = useState(0);
  const [permitList, setPermitList] = useState([]);
  const [selectedPermit, setSelectedPermit] = useState({});
  const [permitExcelExportData, setPermitExcelExportData] = useState({});

  const handleClickOpen = () => {
    setPermitDialogOpen(true);
  };

  const handleClose = () => {
    setPermitDialogOpen(false);
  };

  const handlePermitDataDialogOpen = (item) => {
    setSelectedPermit(item);
    setPermitDataDialogOpen(true);
  };

  const handlePermitDataDialogClose = () => {
    setPermitDataDialogOpen(false);
  };

  const retrieveExcelSheetData = (data) => {
    data.splice(0, 1);
    let tempArr = [];
    data.forEach((element) => {
      tempArr.push(element);
    });

    setPermitExcelExportData(tempArr);
    data.splice(0, 1);
    setPermitNbr(data.length);
    setPermitList(data);
  };

  return (
    <div className="container app-body">
      <nav className="app-sidebar">
        <div className="container-fluid">
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a className="nav-link app-sidebar-link active">
                  <i className="fa-solid fa-house">
                    <FontAwesomeIcon icon={faHouse} />
                  </i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link app-sidebar-link"
                  onClick={handleClickOpen}
                >
                  <i className="fa-regular fa-square-plus">
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main role="main" className="pb-3 page-main">
        <div className="app-list">
          <div className="projects-section">
            <div className="projects-section-header">
              <p>Student Permits </p>
              <p className="time">December, 12</p>
            </div>
            <div className="projects-section-line">
              <div className="projects-status">
                <div className="item-status">
                  <span className="status-number">
                    {permitNbr !== 0 ? permitNbr : 0}
                  </span>
                  <span className="status-type">Permits</span>
                </div>
              </div>
              <div className="view-actions">
                <button className="view-btn list-view active" title="List View">
                  <i className="fa-solid fa-list-ul">
                    <FontAwesomeIcon icon={faListUl} />
                  </i>
                </button>
                {permitList.length !== 0 ? (
                  <CSVLink
                    style={{ textDecoration: "none" }}
                    data={permitExcelExportData}
                    filename={"permit-excel-data.csv"}
                  >
                    <button className="view-btn grid-view" title="Export">
                      <i className="fa-regular fa-share-from-square">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                      </i>
                    </button>
                  </CSVLink>
                ) : null}
              </div>
            </div>
            <div className="project-boxes jsListView">
              {permitList.length !== 0
                ? permitList.map((item, index) => (
                    <div className="project-box-wrapper" key={index}>
                      <div className="project-box">
                        <div className="project-box-header">
                          <div className="more-wrapper">
                            <button
                              className="project-btn-more fa-solid fa-ellipsis-vertical"
                              title="More Details"
                              onClick={() => handlePermitDataDialogOpen(item)}
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                          </div>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">
                            Permit ID {item[6]}
                          </p>
                          <p className="box-content-subheader">
                            Student Name {item[5]}
                          </p>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">
                            Car Type {item[3]}
                          </p>
                          <p className="box-content-subheader">
                            Color : {item[1]}
                          </p>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">{item[2]}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : "No Data Loaded"}
            </div>
          </div>
        </div>
        <UploadPermitListDialog
          open={permitDialogOpen}
          handleClose={handleClose}
          retrieveExcelSheetData={retrieveExcelSheetData}
        />
        <PermitDataDialog
          open={permitDataDialogOpen}
          handleClose={handlePermitDataDialogClose}
          selectedPermit={selectedPermit}
        />
      </main>
    </div>
  );
};
export default Permit;
