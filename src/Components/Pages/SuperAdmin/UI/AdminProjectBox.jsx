import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback } from "react";
import EditUser from "../components/EditUser";

export default function AdminProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);
  function CloseAdd() {
    setModalShow(false);
  }
  const deleteAdminHandler = useCallback(async (admin_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_admin/${admin_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      console.log(resopnse);
      props.fetchUsersHandler();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="project-box-wrapper">
      <div className="project-box">
        <div className="project-box-header">
          <span>{props.date}</span>
          <div className="more-wrapper">
            <button
              className="project-btn-more"
              onClick={() => setModalShow(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            <button
              className="project-btn-more"
              onClick={() => deleteAdminHandler(props.id)}
            >
              <FontAwesomeIcon icon={faTrash} color="#ea6564" />
            </button>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.name}</p>
          <p className="box-content-subheader">{props.email}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">Role</p>
          <p className="box-content-subheader">{props.role}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">Is Active</p>
          <p className="box-content-subheader">{props.active}</p>
        </div>
      </div>
      <EditUser
        fetchUsersHandler={props.fetchUsersHandler}
        data={props}
        show={modalShow}
        onHide={CloseAdd}
      />
      {/* <SelectParticipantForm
        show={modalJobShow}
        onHide={() => setModalJobShow(false)}
      /> */}
    </div>
  );
}
