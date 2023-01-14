import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import EditForm from "../components/EditJob";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback } from "react";

export default function JobsProjectBox(props) {
  const [modalShow, setModalShow] = useState(false);
  function CloseAdd() {
    setModalShow(false);
  }
  const deleteJobsHandler = useCallback(async (job_id) => {
    let resopnse = await axios.post(
      `http://localhost:8000/delete_job/${job_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    try {
      console.log(resopnse);
      props.fetchJobsHandler();
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
              onClick={() => deleteJobsHandler(props.id)}
            >
              <FontAwesomeIcon icon={faTrash} color="#ea6564" />
            </button>
          </div>
        </div>

        <div className="project-box-content-header">
          <img
            width={60}
            height={60}
            src={`http://localhost:8000/${props.image}`}
          ></img>
        </div>

        <div className="project-box-content-header">
          <p className="box-content-header">{props.position}</p>
          <p className="box-content-subheader">{props.company}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.major}</p>
          <p className="box-content-subheader">{props.description}</p>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.deadline}</p>
          <p className="box-content-subheader">{props.req}</p>
        </div>
      </div>
      <EditForm
        fetchJobsHandler={props.fetchJobsHandler}
        data={props}
        show={modalShow}
        onHide={CloseAdd}
      />
    </div>
  );
}
