import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Permit.css";
import UploadPermitListDialog from "../../../utils/upload-permit-list-dialog";
import PermitDataDialog from "../../../utils/permit-data-dialog";
import { CSVLink } from "react-csv";
import {
  faDownload,
  faEllipsisV,
  faEraser,
  faHouse,
  faListUl,
  faPhone,
  faShareFromSquare,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import noResult from "../../../img/permits.gif";
import template from "../../../templates/Permits_Template.xlsx";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import Footer from "../../Footer";

const PermitLogs = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = template;
        alink.download = "SamplePermits.xlsx";
        alink.click();
      });
    });
  };

  const [permitDialogOpen, setPermitDialogOpen] = useState(false);
  const [permitDataDialogOpen, setPermitDataDialogOpen] = useState(false);
  const [permitNbr, setPermitNbr] = useState(0);
  const [permitList, setPermitList] = useState([]);
  const [selectedPermit, setSelectedPermit] = useState({});
  const [permitExcelExportData, setPermitExcelExportData] = useState({});

  const fetchPermitHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_all_call_logs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((permitList) => {
        return permitList;
      });
      setPermitList(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deletePermitsHandler = useCallback(async () => {
    let resopnse = await axios.post(
      "http://localhost:8000/delete_all_permit_holders",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      fetchPermitHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchPermitHandler();
  }, []);

  const resetSemester = () => {
    confirmAlert({
      title: "Start New Semester",
      message: "Starting a new semester will delete all current data stored",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePermitsHandler();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

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
  const setSearch = (data) => {
    setSearchText(data);
  };

  const filterArray = (filter) => {
    const lowercasedValue = filter.toLowerCase().trim();

    if (lowercasedValue === "") setPermitList(permitList);
    else {
      const filteredData = permitList.filter(
        (arr) =>
          arr.receiver.toString().toLowerCase().includes(lowercasedValue) ||
          arr.caller.toString().toLowerCase().includes(lowercasedValue)
      );

      setPermitList(filteredData);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      filterArray(searchText);
    } else {
      setPermitList(permitList);
      fetchPermitHandler();
    }
  }, [searchText]);

  return (
    <>
      <Routes>
        <Route path="/PermitsLog" element={<PermitLogs />}></Route>
      </Routes>
      <Header setSearch={setSearch} />
      <div className="container app-body">
        <nav className="app-sidebar">
          <div className="container-fluid">
            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item">
                  <a className="nav-link app-sidebar-link">
                    <i
                      className="fa-solid fa-house"
                      onClick={() => navigate("/PermitsPage", {})}
                    >
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
                      <FontAwesomeIcon icon={faUpload} />
                    </i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link app-sidebar-link"
                    onClick={resetSemester}
                  >
                    <i className="fa-solid fa-house">
                      <FontAwesomeIcon icon={faEraser} />
                    </i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-sidebar-link active">
                    <i className="fa-solid fa-house">
                      <FontAwesomeIcon icon={faPhone} />
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
                <p>Permits Call Logs</p>
                <p className="time">December, 12</p>
              </div>
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{permitList.length}</span>
                    <span className="status-type">Calls Made</span>
                  </div>
                </div>
                <div className="view-actions">
                  <button
                    className="view-btn list-view active"
                    title="List View"
                  >
                    <i className="fa-solid fa-list-ul">
                      <FontAwesomeIcon icon={faListUl} />
                    </i>
                  </button>
                </div>
              </div>
              <div className="project-boxes jsListView">
                {permitList.length !== 0 ? (
                  permitList.map((item, index) => (
                    <div className="project-box-wrapper" key={index}>
                      <div className="project-box">
                        <div className="project-box-header"></div>

                        <div className="project-box-content-header">
                          <p className="box-content-header">
                            Caller Student ID
                          </p>
                          <p className="box-content-subheader">{item.caller}</p>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">
                            Called Student ID
                          </p>
                          <p className="box-content-subheader">
                            {item.receiver}
                          </p>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">Call Date</p>
                          <p className="box-content-subheader">
                            {item.date}1-12-2023
                          </p>
                        </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">Call Time</p>
                          <p className="box-content-subheader">
                            {item.time}11:00
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="250" height="250" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no Loaded Student Permits Available
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
          <UploadPermitListDialog
            open={permitDialogOpen}
            handleClose={handleClose}
            retrieveExcelSheetData={retrieveExcelSheetData}
            fetchPermitHandler={fetchPermitHandler}
          />
          <PermitDataDialog
            open={permitDataDialogOpen}
            handleClose={handlePermitDataDialogClose}
            selectedPermit={selectedPermit}
            data={selectedPermit}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};
export default PermitLogs;
