import {
  faChalkboardTeacher,
  faChevronRight,
  faFileLines,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../../../SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import { useCallback, useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import axios from "axios";
import TutoringMainProjectBox from "../components/TutoringMainProjectBox";
import { useNavigate } from "react-router-dom";
import CourseRequests from "./CourseRequests";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom/dist";
import "../CSS/tutors.css";
import TutorRequests from "./TutorRequests";
import CreateCourse from "../components/addCourse";
import CreateSession from "../components/addSession";

export default function TutorsMain() {
  const navigate = useNavigate();
  const [modalAddTutoringShow, setModalAddTutoringShow] = useState(false);
  const [modalJobShow, setModalJobShow] = useState(false);

  const [jobs, setJobs] = useState([]);

  const fetchJobsHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000get /get_All_Courses_Sessions"
    );
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

  const [tutoring, setTutoring] = useState([]);
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

  const fetchTutoringHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000/get_All_Courses_Sessions"
    );
    try {
      const data = resopnse.data.map((tutoring) => {
        return tutoring;
      });
      setTutoring(data);
      console.log(tutoring);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTutoringHandler();
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
        setModalAddTutoringShow(true);
      },
    },
  ];

  return (
    <>
      <Routes>
        <Route path="/CourseRequests" element={<CourseRequests />}></Route>
        <Route path="/TutorRequests" element={<TutorRequests />}></Route>
      </Routes>

      <Header />

      <div className={"container app-body tutoring"}>
        <SideBar items={menu} />
        <main role="main" className="pb-3 page-main">
          <div className="tops-container">
            <div className="top-info">
              <div className="projects-status">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="icons" />

                <div className="item-status">
                  <span className="status-number">10</span>
                  <span className="status-type">Tutor Applications</span>
                </div>
              </div>
              <Link to="/TutorRequests">
                <FontAwesomeIcon icon={faChevronRight} className="next" />
              </Link>
            </div>

            <div className="top-info " onClick={CourseRequests}>
              <div className="projects-status">
                <FontAwesomeIcon icon={faFileLines} className="icons" />

                <div className="item-status">
                  <span className="status-number">7</span>
                  <span className="status-type">Course Requests</span>
                </div>
              </div>
              <Link to="/CourseRequests">
                <FontAwesomeIcon icon={faChevronRight} className="next" />
              </Link>
            </div>
          </div>
          <div className="app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Semester Courses</p>
                <p className="time">
                  {" "}
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{tutoring.length}</span>
                    <span className="status-type">Available Session</span>
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
                {tutoring.map((value) => {
                  console.log(value);
                  return (
                    <TutoringMainProjectBox
                      date={value.date}
                      key={value.course_id}
                      course_name={value.course_name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateSession
        show={modalAddTutoringShow}
        onHide={() => setModalAddTutoringShow(false)}
      ></CreateSession>
      <Footer />
    </>
  );
}
