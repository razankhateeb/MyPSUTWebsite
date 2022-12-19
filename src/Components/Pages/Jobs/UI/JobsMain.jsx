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

export default function JobsMain() {
  const [modalAddJobShow, setModalAddJobShow] = useState(false);

  function toggleShow() {
    setModalAddJobShow(!modalAddJobShow);
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
    let resopnse = await axios.get("http://localhost:8000/get_All_Jobs");
    try {
      const data = resopnse.data.map((job) => {
        return job;
      });
      setJobs(data);
      console.log(jobs);
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
                  <button className="view-btn grid-view" title="Export">
                    <FontAwesomeIcon icon={faShareFromSquare} />
                  </button>
                </div>
              </div>
              <div className="project-boxes jsListView">
                {jobs.map((value) => {
                  return (
                    <JobsProjectBox
                      date={value.date}
                      key={value.job_id}
                      position={value.job_title}
                      company={value.company_name}
                      major={value.college}
                      spec={value.desc}
                      deadline={value.job_Deadline}
                      condition={value.condition}
                      req={value.req}
                      image={value.job_icon_image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddJob
        show={modalAddJobShow}
        onHide={() => setModalAddJobShow(false)}
      ></AddJob>
      <Footer />
    </>
  );
}
