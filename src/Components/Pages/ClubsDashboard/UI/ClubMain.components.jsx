import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../../../SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { useCallback, useEffect, useState } from "react";
import ClubProjectBox from "./ClubsProjectBox.components";
import MessageBox from "./MessageBox.components";
import "../CSS/clubs.styles.css";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import axios from "axios";
import CreateEvent from "../../EventsDashboard/Components/createEvent.components";
import CreateClub from "../createClub.jsx";
import EditClub from "../editClub";
import noResult from "../../../../img/event-alert.gif";

export default function ClubMain() {
  const [modalCreateEventShow, setModalCreateEventShow] = useState(false);
  const [modalCreateClubShow, setModalCreateClubShow] = useState(false);
  const [modalEditClubShow, setModalEditClubShow] = useState(false);

  const [clubs, setClubs] = useState([]);
  const [clubsEvents, setClubsEvents] = useState([]);
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

  const fetchClubsEventsHandler = useCallback(async () => {
    await axios.get("http://localhost:8000/get_club_events").then((res) => {
      const data = res.data.map((event) => {
        return event;
      });
      setClubsEvents(data);
    });
  });
  const fetchClubsHandler = useCallback(async () => {
    await axios.get("http://localhost:8000/get_All_Clubs").then((res) => {
      const data = res.data.map((club) => {
        return club;
      });
      setClubs(data);
    });
  });
  useEffect(() => {
    fetchClubsHandler();
    fetchClubsEventsHandler();
  }, []);

  const menu = [
    {
      icon: faHouse,
      classes: "active",
    },
    {
      icon: faCalendarPlus,
      classes: "",
      onClick: () => {
        setModalCreateEventShow(true);
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
                <p>Club Events</p>
                <p className="time">
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{clubsEvents.length}</span>
                    <span className="status-type">Upcoming</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">24</span>
                    <span className="status-type">Completed</span>
                  </div>
                  <div className="item-status">
                    <span className="status-number">62</span>
                    <span className="status-type">Total Events</span>
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
                {clubsEvents.length > 0 ? (
                  clubsEvents.map((value) => (
                    <ClubProjectBox
                      key={value.event_id}
                      date={value.start_date}
                      eventName={value.event_name}
                      clubName={value.club_name}
                      startTime={value.start_time}
                      endTime={value.end_time}
                    />
                  ))
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no current events available
                    </h5>
                  </div>
                )}
              </div>
            </div>
            <div className="messages-section">
              <div className="projects-section-header">
                <p>Active clubs</p>
                <div className="d-flex">
                  <button
                    className="add-btn"
                    title="Add New Project"
                    onClick={() => setModalCreateClubShow(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button className="messages-close">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
                </div>
              </div>
              <div className="messages">
                {clubs.map((value) => (
                  <MessageBox
                    key={value.club_id}
                    func={() => setModalEditClubShow(true)}
                    name={value.club_name}
                    image={`http://localhost:8000/static/images/Clubs/IconImages/Screenshot from 2022-09-05 23-09-24.png`}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateEvent
        show={modalCreateEventShow}
        onHide={() => setModalCreateEventShow(false)}
      ></CreateEvent>

      <CreateClub
        show={modalCreateClubShow}
        onHide={() => setModalCreateClubShow(false)}
      ></CreateClub>

      <EditClub
        show={modalEditClubShow}
        onHide={() => setModalEditClubShow(false)}
      ></EditClub>
      <Footer />
    </>
  );
}
