import {
  faArrowLeft,
  faBackward,
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
import { Link, useNavigate } from "react-router-dom";
import CreateCourse from "../components/addCourse";

import "../CSS/tutors.css";

export default function CourseRequests() {
  const navigate = useNavigate();
  const [modalAddTutoringShow, setModalAddTutoringShow] = useState(false);

  const [modalAddCourseShow, setModalAddCourseShow] = useState(false);

  function toggleShow() {
    setModalAddTutoringShow(!modalAddTutoringShow);
  }
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
    let resopnse = await axios.get("http://localhost:8000/get_All_Courses");
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

  return (
    <>
      <Header />
      <div className={"container app-body tutoring"}>
        <main role="main" className="pb-3 page-main">
          <div className="d-flex mb-4 justify-content-between ">
            <Link to="/TutorsPage">
              <FontAwesomeIcon icon={faArrowLeft} className="inside-back" />
            </Link>
            <button
              className="btn inside-add"
              onClick={() => setModalAddCourseShow(true)}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
              <span className="plus-icon">Add New Course</span>
            </button>
          </div>
          <div className="app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Courses Requests</p>
                <p className="time">
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{tutoring.length}</span>
                    <span className="status-type">Pending Requests</span>
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
      <CreateCourse
        show={modalAddCourseShow}
        onHide={() => setModalAddCourseShow(false)}
        toggleshow={toggleShow}
      ></CreateCourse>
      <Footer />
    </>
  );
}
