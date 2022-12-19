import ProjectBoxList from "./ProjectBoxList.components";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import SideBar from "../../SideBar";
import { faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Footer from "../../Footer";
import Header from "../../Shared/Header/Header";
import "./CSS/event.css";
import { useCallback, useEffect, useState } from "react";
import CreateEvent from "./Components/createEvent.components";
import SelectParticipantForm from "./selectParticipant.components";

export default function EventMain() {
  const [modalCreateEventShow, setModalCreateEventShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalOrganizer, setModalOrganizer] = useState(false);

  const fetchEventHandler = useCallback(async () => {
    let resopnse = await fetch("http://localhost:8000/get_All_Events");
    try {
      resopnse.json().then((value) => {
        const data = value.map((eve) => {
          return eve;
        });
        setEvents(data);
        console.log(events);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchEventHandler();
  }, [fetchEventHandler]);

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
    {
      icon: faPerson,
      classes: "",
      onClick: () => {
        setModalOrganizer(true);
      },
    },
  ];

  return (
    <>
      <Header />
      <div className={"container app-body"}>
        <SideBar items={menu} />
        <main role="main" className="pb-3 d-flex w-100">
          <div className="w-100">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Events Dashboard</p>
                <p className="fa-2x">
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>
              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{events.length}</span>
                    <span className="status-type">Upcoming Events</span>
                  </div>
                </div>
                <div className="view-actions">
                  <button
                    className="view-btn list-view active"
                    title="List View"
                  >
                    <i>
                      <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon>{" "}
                    </i>
                  </button>
                  <button className="view-btn grid-view" title="Export">
                    <i>
                      <FontAwesomeIcon
                        icon={faShareFromSquare}
                      ></FontAwesomeIcon>{" "}
                    </i>
                  </button>
                </div>
              </div>
              <div className="project-boxes jsListView">
                <ProjectBoxList eventsProp={events} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateEvent
        show={modalCreateEventShow}
        onHide={() => setModalCreateEventShow(false)}
      ></CreateEvent>
      <SelectParticipantForm
        show={modalOrganizer}
        onHide={() => setModalOrganizer(false)}
      />
      <Footer />
    </>
  );
}
