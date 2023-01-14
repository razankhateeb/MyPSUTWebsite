import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import SideBar from "../../../SideBar";
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
import noResult from "../../../../img/users.gif";

export default function AdminMain() {
  const [modalAddJobShow, setModalAddJobShow] = useState(false);
  const [searchText, setSearchText] = useState("");
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

  function CloseAdd() {
    setModalAddJobShow(false);
  }

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

  //search function
  const setSearch = (data) => {
    setSearchText(data);
  };

  const filterArray = (filter) => {
    const lowercasedValue = filter.toLowerCase().trim();

    if (lowercasedValue === "") setUsers(users);
    else {
      const filteredData = users.filter(
        (arr) =>
          arr.email.toString().toLowerCase().includes(lowercasedValue) ||
          arr.user_role.toString().toLowerCase().includes(lowercasedValue)
      );

      setUsers(filteredData);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      filterArray(searchText);
    } else {
      setUsers(users);
      fetchUsersHandler();
    }
  }, [searchText]);

  useEffect(() => {
    fetchUsersHandler();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {/* {console.log(`searchtext inside main is: ${searchText}`)} */}
      <div className={"container app-body"}>
        <SideBar items={menu} />
        <main role="main" className="pb-3 page-main">
          <div className="app-list">
            <div className="projects-section">
              <div className="projects-section-header">
                <p>Admins</p>
                <p className="time">
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
                {users.length > 0 ? (
                  users.map((value) => {
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
                  })
                ) : (
                  <div className="d-flex flex-column align-items-center mt-5">
                    <img width="300" height="300" src={noResult} />
                    <h5 className="mt-3 text-capitalize">
                      Looks like there are no available users
                    </h5>
                  </div>
                )}
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
