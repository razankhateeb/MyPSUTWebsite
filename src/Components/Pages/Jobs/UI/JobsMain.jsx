import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../../../SideBar";
import JobsProjectBox from "./JobsProjectBox";
import AddJob from "../components/addJob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import { useCallback, useEffect, useState } from "react";
import "../css/jobs.css";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import axios from "axios";
import noResult from "../../../../img/job.gif";
import { CSVLink } from "react-csv";

export default function JobsMain() {
  const [modalAddJobShow, setModalAddJobShow] = useState(false);

  function CloseAdd() {
    setModalAddJobShow(false);
  }
  const [jobs, setJobs] = useState([]);
  const [date, setDate] = useState(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchJobsHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_All_Jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((job) => {
        return job;
      });
      setJobs(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchJobsHandler();
  }, []);

  const menu = [
    {
      id: 1,
      icon: faHouse,
      classes: "active",
    },
    {
      id: 2,
      icon: faSquarePlus,
      classes: "",
      onClick: () => {
        setModalAddJobShow(true);
      },
    },
  ];

  return (
    <>
      <Header />
      <div className={"container app-body"}>
        <SideBar items={menu} />
        <main role="main" className="pb-3 page-main">
          <div className="app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Job Vacancies</p>
                <p className="time">
                  {" "}
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{jobs.length}</span>
                    <span className="status-type">Upcoming</span>
                  </div>
                </div>
                <div className="view-actions">
                  <button
                    className="view-btn list-view active"
                    title="List View"
                  >
                    <FontAwesomeIcon icon={faListUl} />
                  </button>
                  {/* export excel sheet of data */}
                  <CSVLink
                    style={{ textDecoration: "none" }}
                    data={jobs}
                    filename={"Jobs_Report.csv"}
                  >
                    <button className="view-btn grid-view" title="Export">
                      <i className="fa-regular fa-share-from-square">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                      </i>
                    </button>
                  </CSVLink>
                </div>
              </div>
              <div className="project-boxes jsListView">
                {jobs.length > 0 ? (
                  jobs.map((value) => {
                    return (
                      <JobsProjectBox
                        fetchJobsHandler={fetchJobsHandler}
                        id={value.job_id}
                        date={value.date}
                        key={value.job_id}
                        position={value.job_title}
                        company={value.company_name}
                        major={value.college}
                        description={value.job_description}
                        deadline={value.job_Deadline}
                        responsibility={value.job_responsanbilities}
                        requirements={value.job_requierments}
                        image={value.job_icon_image}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no current Jobs available
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddJob
        show={modalAddJobShow}
        onHide={CloseAdd}
        fetchJobsHandler={fetchJobsHandler}
      ></AddJob>
      <Footer />
    </>
  );
}
