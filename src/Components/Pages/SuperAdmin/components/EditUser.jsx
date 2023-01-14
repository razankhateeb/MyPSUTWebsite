import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const success = () => toast.success("Successfully registered");
const errormsg = () => toast.error("Oops! An error occurred.");

export default function EditUser(props) {
  console.log(props.data.id);
  const [email, setEmail] = useState(props.data.email);
  const [active, setActive] = useState(props.data.active);
  const [superuser, setSuperuser] = useState(props.data.superuser);
  const [name, setName] = useState(props.data.name);
  const [role, setRole] = useState(props.data.role);
  const [password, setPassword] = useState(props.data.password);
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
        `http://localhost:8000/update_admin/${props.data.id}`,
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
          props.fetchUsersHandler();
          props.onHide();
          success();
        }
      })
      .catch((error) => {
        errormsg();
      });
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Edit Job</h5>
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Start Time">
                <b>Change Password</b>
              </label>
              <input
                type="passwprd"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="col-sm-12 col-lg-6">
              <label htmlFor="Major">
                <b>Role</b>
              </label>
              <select
                list="role"
                placeholder="Select Major"
                name="role"
                value={`${role}`}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
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
                  checked={active}
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
                  checked={!active}
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
                  checked={superuser}
                  onSelect={(e) => {
                    setSuperuser(e.target.value);
                  }}
                />
                <label for="radio-three">True</label>
                <input
                  type="radio"
                  id="radio-four"
                  className="second"
                  name="is_superuser"
                  value="false"
                  checked={!superuser}
                  onSelect={(e) => {
                    setSuperuser(e.target.value);
                  }}
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
