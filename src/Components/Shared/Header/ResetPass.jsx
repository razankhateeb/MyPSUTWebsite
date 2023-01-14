import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";

import { Modal } from "react-bootstrap";
import AuthContext from "../../../Auth/authContext";

export default function ResetPass(props) {
  const [old, setOld] = useState("");
  const [nPass, setNewPass] = useState("");
  const authCtx = useContext(AuthContext);

  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();
    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/forget-password/${authCtx.user_id}`,
        { password: `${old}`, newPassword: `${nPass}` },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // success();
          props.onHide();
        }
      })
      .catch((error) => {
        //  errormsg();
      });
  };

  return (
    <>
      <Modal
        show={props.show}
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Reset Password</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" className="form-container">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <label htmlFor="Event Name">
                  <b>Old Password</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Position Name"
                  name="position"
                  onChange={(e) => {
                    setOld(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-sm-12 col-lg-6">
                <label htmlFor="Event Name">
                  <b>New Password</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Position Name"
                  name="position"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-12">
                <button type="button" className="btn" onClick={submitForm}>
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
