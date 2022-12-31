import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import { useCallback, useEffect, useState } from "react";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import { Link, useLocation } from "react-router-dom";
import noResult from "../../../../img/tutor.gif";

import "../CSS/tutors.css";
import CreateTutor from "../components/addTutor";
import TRequest from "../components/tRequest";
import axios from "axios";

export default function TutorRequests(props) {
  const location = useLocation();
  const [modalCreateTutorShow, setModalCreateTutorShow] = useState(false);
  const [tutoringRequests, setTutoringRequests] = useState([]);
  const [tlist, setTutors] = useState("");

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
  const deleteRequestHandler = useCallback(async (tutor_request_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_tutor_request/${tutor_request_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      fetchTutoringRequestsHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const acceptRequestHandler = useCallback(async (tutor_request_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/accept_tutor_request/${tutor_request_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      fetchTutoringRequestsHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    deleteRequestHandler();
    fetchTutoringRequestsHandler();
  }, []);

  return (
    <>
      <Header />
      <div className={"container app-body tutoring"}>
        <main role="main text-align-right" className="pb-3 page-main">
          <div className="d-flex mb-4 justify-content-between ">
            <Link to="/TutorsPage">
              <FontAwesomeIcon icon={faArrowLeft} className="inside-back" />
            </Link>
            {/* <button
              className="btn inside-add"
              onClick={() => setModalCreateTutorShow(true)}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
              <span className="plus-icon">Add New Tutor</span>
            </button> */}
          </div>
          <div className="tutors app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Tutor Requests</p>
                <p className="time">
                  {" "}
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">
                      {tutoringRequests.length}
                    </span>
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
                {tutoringRequests.length > 0 ? (
                  tutoringRequests.map((value) => {
                    return (
                      <TRequest
                        date={value.date}
                        key={value.tutor_request_id}
                        tid={value.tutor_request_id}
                        cid={value.course_id}
                        sid={value.student_id}
                        rid={value.tutor_request_id}
                        course_name={value.course_name}
                        s_name={value.Student_Name}
                        grade={value.grade}
                        semester={value.semester_completion}
                        decline={deleteRequestHandler}
                        accept={acceptRequestHandler}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no current Tutor Requests available
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateTutor
        show={modalCreateTutorShow}
        onHide={() => setModalCreateTutorShow(false)}
        tutorslist={tlist}
      ></CreateTutor>
      <Footer />
    </>
  );
}
