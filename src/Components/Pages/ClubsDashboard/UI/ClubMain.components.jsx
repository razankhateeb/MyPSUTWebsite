import { faHouse } from "@fortawesome/free-solid-svg-icons";
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
import CreateClub from "../createClub.jsx";
import noResult from "../../../../img/event-alert.gif";
import CreateEventClub from "../Components/createEventClub.components";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

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
    await axios
      .get("http://localhost:8000/get_club_events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        const data = res.data.map((event) => {
          return event;
        });
        setClubsEvents(data);
      });
  });
  const fetchClubsHandler = useCallback(async () => {
    await axios
      .get("http://localhost:8000/get_All_Clubs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
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
      icon: faSquarePlus,
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
                  clubsEvents.map(
                    (value) => (
                      console.log(clubsEvents),
                      (
                        <ClubProjectBox
                          key={value.event_id}
                          data={value}
                          clubs={clubs}
                          fetchClubsEventsHandler={fetchClubsEventsHandler}
                        />
                      )
                    )
                  )
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
                    key={value["club_id"]}
                    name={value["club_name"]}
                    image={value["club_icon_image"]}
                    value={value}
                    fetchClubsHandler={fetchClubsHandler}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateEventClub
        show={modalCreateEventShow}
        onHide={() => setModalCreateEventShow(false)}
        clubs={clubs}
        fetchClubsEventsHandler={fetchClubsEventsHandler}
      ></CreateEventClub>

      <CreateClub
        show={modalCreateClubShow}
        onHide={() => setModalCreateClubShow(false)}
        fetchClubsHandler={fetchClubsHandler}
      ></CreateClub>

      <Footer />
    </>
  );
}
