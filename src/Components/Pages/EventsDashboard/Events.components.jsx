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
import ProjectBox from "./projectBox.components";
import axios from "axios";
import SelectParticipantForm from "./selectParticipant.components copy";
import { CSVLink } from "react-csv";
import noResult from "../../../img/event-alert.gif";

export default function EventMain() {
  const [modalCreateEventShow, setModalCreateEventShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalOrganizer, setModalOrganizer] = useState(false);
  const [org, setOrgs] = useState([]);
  function CloseAdd() {
    setModalCreateEventShow(false);
  }
  const fetchOrgsHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/get_All_Organizers", {
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

  const fetchEventHandler = useCallback(async () => {
    let resopnse = await fetch("http://localhost:8000/get_All_Events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      resopnse.json().then((value) => {
        const data = value.map((eve) => {
          return eve;
        });
        setEvents(data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchEventHandler();
    fetchOrgsHandler();
  }, []);

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

  const [searchText, setSearchText] = useState("");

  const setSearch = (data) => {
    setSearchText(data);
  };

  const filterArray = (filter) => {
    const lowercasedValue = filter.toLowerCase().trim();

    if (lowercasedValue === "") setEvents(events);
    else {
      const filteredData = events.filter(
        (arr) =>
          arr.event_name.toString().toLowerCase().includes(lowercasedValue) ||
          arr.location.toString().toLowerCase().includes(lowercasedValue)
      );

      setEvents(filteredData);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      filterArray(searchText);
    } else {
      setEvents(events);
      fetchEventHandler();
    }
  }, [searchText]);

  return (
    <>
      <Header setSearch={setSearch} />
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
                  <CSVLink
                    style={{ textDecoration: "none" }}
                    data={events}
                    filename={"Events_Report.csv"}
                  >
                    <button className="view-btn grid-view" title="Export">
                      <FontAwesomeIcon icon={faShareFromSquare} />
                    </button>
                  </CSVLink>
                </div>
              </div>
              <div className="project-boxes jsListView">
                {events.length > 0 ? (
                  events.map((value) => {
                    return (
                      <ProjectBox
                        fetchEventHandler={fetchEventHandler}
                        id={value.event_id}
                        key={value.event_id}
                        date={value.date}
                        name={value.event_name}
                        location={value.location}
                        sDate={value.start_date}
                        eDate={value.end_date}
                        sTime={value.start_time}
                        eTime={value.end_time}
                        description={value.description}
                        image={value.event_image}
                        organizers={value.organizers}
                        org_list={org}
                      />
                    );
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no available events
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateEvent
        show={modalCreateEventShow}
        onHide={CloseAdd}
        fetchEventHandler={fetchEventHandler}
        organizers={org}
      ></CreateEvent>
      <SelectParticipantForm
        show={modalOrganizer}
        onHide={() => setModalOrganizer(false)}
        fetchOrgsHandler={fetchOrgsHandler}
        organizers={org}
      />
      <Footer />
    </>
  );
}
