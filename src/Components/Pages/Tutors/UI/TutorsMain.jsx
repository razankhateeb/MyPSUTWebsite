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
import noResult from "../../../../img/tutor.gif";

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
  const [tutoringRequests, setTutoringRequests] = useState([]);

  const [courseRequest, setCourseRequest] = useState([]);

  const [date, setDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [org, setOrgs] = useState([]);
  const [crs, setCrs] = useState([]);

  function CloseAdd() {
    setModalAddTutoringShow(false);
  }
  const fetchOrgsHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_All_Tutors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((org) => {
        return org;
      });
      setOrgs(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCrsHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_All_Courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((crs) => {
        return crs;
      });
      setCrs(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCourseRequestHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000/get_All_Course_Requests",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      const data = resopnse.data.map((tutoring) => {
        return tutoring;
      });
      setCourseRequest(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchTutoringRequestsHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000/get_All_Tutor_Requests",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      const data = resopnse.data.map((tutoringRequests) => {
        return tutoringRequests;
      });

      setTutoringRequests(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchSessionsHandler = useCallback(async () => {
    let resopnse = await axios.get(
      "http://localhost:8000/get_all_courses_sessions_details",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      const data = resopnse.data.map((session) => {
        return session;
      });
      setSessions(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

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

  useEffect(() => {
    fetchSessionsHandler();
    fetchCourseRequestHandler();
    fetchTutoringRequestsHandler();
    fetchOrgsHandler();
    fetchCrsHandler();
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
                  <span className="status-number">
                    {tutoringRequests.length}
                  </span>
                  <span className="status-type">Tutor Applications</span>
                </div>
              </div>

              <FontAwesomeIcon
                icon={faChevronRight}
                className="next"
                onClick={() =>
                  navigate("/TutorRequests", {
                    state: tutoringRequests,
                  })
                }
              />
            </div>

            <div className="top-info " onClick={CourseRequests}>
              <div className="projects-status">
                <FontAwesomeIcon icon={faFileLines} className="icons" />

                <div className="item-status">
                  <span className="status-number"> {courseRequest.length}</span>
                  <span className="status-type">Course Requests</span>
                </div>
              </div>

              <FontAwesomeIcon
                icon={faChevronRight}
                className="next"
                onClick={() =>
                  navigate("/CourseRequests", { state: courseRequest })
                }
              />
            </div>
          </div>
          <div className="app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Course Sessions</p>
                <p className="time">
                  {" "}
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{sessions.length}</span>
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
                {sessions.length > 0 ? (
                  sessions.map((value) => {
                    return (
                      <TutoringMainProjectBox
                        date={value.date}
                        key={value.course_id}
                        course_name={value.course_name}
                        std_name={value.std_name}
                        std_id={value.std_id}
                        session_id={value.session_id}
                        tid={value.tutor_id}
                        cid={value.course_id}
                        sessions={value.sessions}
                        fetchSessionsHandler={fetchSessionsHandler}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <img width="200" height="200" src={noResult} />
                    <h5 className="text-capitalize">
                      Looks like there are no current Sessions available
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateSession
        show={modalAddTutoringShow}
        onHide={CloseAdd}
        fetchSessionsHandler={fetchSessionsHandler}
        organizers={org}
        courses={crs}
      ></CreateSession>
      <Footer />
    </>
  );
}
