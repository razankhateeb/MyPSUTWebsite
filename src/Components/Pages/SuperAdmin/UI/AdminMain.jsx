import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../../../SideBar";
import JobsProjectBox from "./AdminProjectBox";
import AddJob from "../components/addUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";
import { useCallback, useEffect, useState } from "react";
import "../css/jobs.css";
import Header from "../../../Shared/Header/Header";
import Footer from "../../../Footer";
import axios from "axios";
import AdminProjectBox from "./AdminProjectBox";
import AddUser from "../components/addUser";

export default function AdminMain() {
  const [modalAddJobShow, setModalAddJobShow] = useState(false);

  function CloseAdd() {
    setModalAddJobShow(false);
  }
  const [users, setUsers] = useState([]);
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

  const fetchUsersHandler = useCallback(async () => {
    let resopnse = await axios.get("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    try {
      const data = resopnse.data.map((user) => {
        return user;
      });
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchUsersHandler();
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
                <p>Admins</p>
                <p className="time">
                  {" "}
                  {months[date.getMonth()]}, {date.getDate()}
                </p>
              </div>

              <div className="projects-section-line">
                <div className="projects-status">
                  <div className="item-status">
                    <span className="status-number">{users.length}</span>
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
                {users.map((value) => {
                  return (
                    <AdminProjectBox
                      id={value.id}
                      fetchUsersHandler={fetchUsersHandler}
                      date={value.date}
                      key={value.email}
                      email={value.email}
                      active={value.is_active}
                      superuser={value.is_superuser}
                      name={value.full_name}
                      role={value.user_role}
                      password={value.password}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddUser
        show={modalAddJobShow}
        onHide={CloseAdd}
        fetchUsersHandler={fetchUsersHandler}
      ></AddUser>
      <Footer />
    </>
  );
}
