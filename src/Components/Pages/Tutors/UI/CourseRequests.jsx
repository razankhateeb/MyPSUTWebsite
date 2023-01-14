import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { useCallback, useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import noResult from "../../../../img/tutor.gif";

import "../CSS/tutors.css";
import CRequests from "../components/cRequest";

export default function CourseRequests() {
  const [modalAddCourseShow, setModalAddCourseShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");

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
  const [courseTutors, setCourseTutor] = useState([]);

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
      const data = resopnse.data.map((courses) => {
        return courses;
      });
      setCourses(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteRequestHandler = useCallback(async (course_requset_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_course_request/${course_requset_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      fetchCourseRequestHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchCourseRequestHandler();
    deleteRequestHandler();
  }, []);

  const setSearch = (data) => {
    setSearchText(data);
  };

  const filterArray = (filter) => {
    const lowercasedValue = filter.toLowerCase().trim();

    if (lowercasedValue === "") setCourses(courses);
    else {
      const filteredData = courses.filter(
        (arr) =>
          arr.Course_Name.toString().toLowerCase().includes(lowercasedValue) ||
          arr.Course_id.toString().toLowerCase().includes(lowercasedValue) ||
          arr.Total.toString().toLowerCase().includes(lowercasedValue)
      );

      setCourses(filteredData);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      filterArray(searchText);
    } else {
      setCourses(courses);
      fetchCourseRequestHandler();
    }
  }, [searchText]);
  return (
    <>
      <Header setSearch={setSearch} />

      <div className={"container app-body tutoring"}>
        <main role="main" className="pb-3 page-main">
          <div className="d-flex mb-4 justify-content-between ">
            <Link to="/TutorsPage">
              <FontAwesomeIcon icon={faArrowLeft} className="inside-back" />
            </Link>
          </div>
          <div className="courses app-list">
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
                    <span className="status-number">{courses.length}</span>
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
                </div>
              </div>
              <div className="project-boxes jsListView">
                {courses.length > 0 ? (
                  courses.map((value) => {
                    console.log(value);
                    return (
                      <CRequests
                        date={value.date}
                        key={value.Course_id}
                        id={value.Course_id}
                        course_name={value.Course_Name}
                        total={value.Total}
                        decline={deleteRequestHandler}
                        courseTutors={courseTutors}
                        fetchCourseRequestHandler={fetchCourseRequestHandler}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="250" height="250" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no current Course Requests available
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
