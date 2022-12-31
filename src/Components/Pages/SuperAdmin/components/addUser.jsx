import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function AddUser(props) {
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [superuser, setSuperuser] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const isActiveOnChange = (e) => {
    setActive(e.target.value);
  };
  const isSuperUserOnChange = (e) => {
    setSuperuser(e.target.value);
  };
  const submitForm = async (event) => {
    // prevents default form as in prevents reload on submit
    event.preventDefault();

    //axios helps to send post
    await axios
      .post(
        `http://localhost:8000/create_user?`,
        {
          email: email,
          is_active: active,
          is_superuser: superuser,
          full_name: name,
          user_role: role,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          success();
          props.onHide();
          props.fetchUsersHandler();
        }
      })
      .catch((error) => {
        errormsg();
      });
  };

  return (
    <Modal
      show={props.show}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Create New User</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" className="form-container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Event Name">
                <b>User Email</b>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Password</b>
              </label>
              <input
                type="passwprd"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Name">
                <b>User Full Name</b>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                name="company"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Major">
                <b>Role</b>
              </label>
              <select
                list="major_list"
                placeholder="Select Major"
                name="major"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                required
              >
                <option value={"Select"} defaultValue disabled>
                  Any
                </option>
                <option value={"SUPERUSER"}>Super Admin</option>
                <option value={"EventsAdmin"}>Events Admin</option>
                <option value={"ClubsAdmin"}>Clubs Admin</option>
                <option value={"JobsAdmin"}>Jobs Admin</option>
                <option value={"TutorsAdmin"}>Tutor Admin</option>
                <option value={"BusAdmin"}>Bus Admin</option>
                <option value={"PermitsAdmin"}>Permits Admin</option>
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Deadline">
                <b>Is Active</b>
              </label>
              <div class="switch-field mt-1" onChange={isActiveOnChange}>
                <input
                  type="radio"
                  id="radio-one"
                  className="first"
                  name="is_active"
                  value="true"
                  onSelect={(e) => {
                    setActive(e.target.value);
                  }}
                />
                <label for="radio-one">True</label>
                <input
                  type="radio"
                  id="radio-two"
                  className="second"
                  name="is_active"
                  onSelect={(e) => {
                    setActive(e.target.value);
                  }}
                  value="false"
                />
                <label for="radio-two">False</label>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <label htmlFor="requirements">
                <b>Is Superuser</b>
              </label>
              <div class="switch-field mt-1" onChange={isSuperUserOnChange}>
                <input
                  type="radio"
                  id="radio-three"
                  className="first"
                  name="is_superuser"
                  value="true"
                />
                <label for="radio-three">True</label>
                <input
                  type="radio"
                  id="radio-four"
                  className="second"
                  name="is_superuser"
                  value="false"
                />
                <label for="radio-four">False</label>
              </div>
            </div>

            <div className="col-12">
              <button type="button" className="btn" onClick={submitForm}>
                Create User
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Toaster position="top-right" reverseOrder={true} />
    </Modal>
  );
}
