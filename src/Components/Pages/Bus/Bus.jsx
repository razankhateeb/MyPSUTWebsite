import React, { useRef, useState } from "react";
import "./Bus.css";
import NewRouteDialog from "../../../utils/new-route-dialog";
import { Link } from "react-router-dom";
import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadBusStudentListDialog from "../../../utils/upload-bus-student-list-dialog";
import RoutePdfViewer from "../../../utils/route-pdf-viewer";
import { CSVLink } from "react-csv";
import {
  faBusSimple,
  faDownload,
  faEraser,
  faHouse,
  faListUl,
  faPlus,
  faShareAltSquare,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import noResult from "../../../img/bus.gif";
import template from "../../../templates/Bus_Template.xlsx";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; //
import AddRoute from "./addRoute";
import AddRamadan from "./addRamadan";
import Footer from "../../Footer";
import Header from "../../Shared/Header/Header";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";

const Bus = () => {
  const [open, setOpen] = useState(false);
  const [modalAddRoute, setModalAddRouteShow] = useState(false);
  const [modalAddRamadan, setModalAddRamadanShow] = useState(false);
  const [newRouteDialogOpen, setNewRouteDialogOpen] = useState(false);
  const [busStudentDialongOpen, setBusStudentDialogOpen] = useState(false);
  const [busTimePdfDialog, setBusTimePdfDialogOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [busStudentsList, setBusStudentsList] = useState([]);
  const [excelExportData, setExcelExportData] = useState([]);
  const inputFile = useRef(null);
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
        alink.download = "SampleBus.xlsx";
        alink.click();
      });
    });
  };

  function CloseAdd() {
    setModalAddRouteShow(false);
  }

  function CloseRamadan() {
    setModalAddRamadanShow(false);
  }
  const fetchBusHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_All_Bus_Routes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((busStudentsList) => {
        return busStudentsList;
      });
      setBusStudentsList(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteBusHandler = useCallback(async () => {
    let resopnse = await axios.post(
      "http://localhost:8000/delete_all_bus_routes",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      fetchBusHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchBusHandler();
  }, []);

  const resetSemester = () => {
    confirmAlert({
      title: "Start New Semester",
      message: "Starting a new semester will delete all current data stored",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteBusHandler();
            fetchBusHandler();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

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
    fetchBusHandler();
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

  const setSearch = (data) => {
    setSearchText(data);
  };

  const filterArray = (filter) => {
    const lowercasedValue = filter.toLowerCase().trim();

    if (lowercasedValue === "") setBusStudentsList(busStudentsList);
    else {
      const filteredData = busStudentsList.filter(
        (arr) =>
          arr.route.toString().toLowerCase().includes(lowercasedValue) ||
          arr.student_id.toString().toLowerCase().includes(lowercasedValue)
      );

      setBusStudentsList(filteredData);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      filterArray(searchText);
    } else {
      setBusStudentsList(busStudentsList);
      fetchBusHandler();
    }
  }, [searchText]);

  return (
    <>
      <Header setSearch={setSearch} />
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
                    <FontAwesomeIcon icon={faUpload} size="2x" />
                    <input
                      hidden
                      type="file"
                      onChange={handleChange}
                      ref={inputFile}
                    />
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
                <p className="time">December, 12</p>
              </div>
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">
                      {busStudentsList.length}
                    </span>
                    <span className="status-type">Students</span>
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
                  <button className="btn inside-add" onClick={onButtonClick}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span className="plus-icon">Download Template</span>
                  </button>
                  {busStudentsList.length !== 0 ? (
                    <CSVLink
                      style={{ textDecoration: "none" }}
                      data={busStudentsList}
                      filename={"bus-excel-data.csv"}
                    >
                      <button className="view-btn grid-view" title="Export">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                      </button>
                    </CSVLink>
                  ) : null}
                </div>
              </div>
              <div className="projects-section-line"></div>
              <div className="project-boxes jsListView">
                {busStudentsList.length !== 0 ? (
                  busStudentsList.map((item) => (
                    <div className="project-box-wrapper ">
                      <div className="row bus-project-box justify-content-center">
                        <div className="col-2">
                          <div className="row box-content-header">
                            Routename
                          </div>
                          <div className="row"> {item.route}</div>
                        </div>
                        <div className="col-3">
                          <div className="row box-content-header">
                            Student ID{" "}
                          </div>
                          <div className="row"> {item.student_id}</div>
                        </div>
                        <div className="col-3">
                          <div className="row box-content-header">M/W </div>
                          <div className="row">
                            Trip A : {item.mon_wed_presence}
                          </div>
                          <div className="row">
                            {" "}
                            Trip B : {item.mon_wed_back}
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="row box-content-header"> S/T/TH</div>
                          <div className="row" style={{ whiteSpace: "noWrap" }}>
                            Trip A : {item.sun_tue_thu_presence}
                          </div>
                          <div className="row" style={{ whiteSpace: "noWrap" }}>
                            Trip B : {item.sun_tue_thu_back}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks Like there is no Data Available
                    </h5>
                  </div>
                )}
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
                  // onClick={handleBusTimePdfDialogOpen}
                  // onClick={setModalAddRouteShow(true)}
                >
                  <div className="d-flex">
                    <i className="fa-solid fa-clock">
                      <FontAwesomeIcon icon={faClock} />
                    </i>
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">Academic Time</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => setModalAddRouteShow(true)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                  </div>
                </div>

                <div
                  className="message-box justify-content-between"
                  //onClick={() => setModalAddRouteShow(true)}
                  //onClick={setModalAddRouteShow(true)}
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
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => setModalAddRamadanShow(true)}
                    >
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

              <AddRoute show={modalAddRoute} onHide={CloseAdd}></AddRoute>
              <AddRamadan
                show={modalAddRamadan}
                onHide={CloseRamadan}
              ></AddRamadan>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
export default Bus;
