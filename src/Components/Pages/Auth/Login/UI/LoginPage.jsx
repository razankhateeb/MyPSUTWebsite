import { useContext, useRef } from "react";
import AuthContext from "../../../../../Auth/authContext";
import Logo from "../../../../../img/logo.png";
import "../CSS/loginForm.styles.css";
import BackgroundImage from "../../../../../img/login-bg.webp";
import { useState } from "react";

export default function LoginPage() {
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUserName = userNameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const request = new FormData();
    request.append("username", enteredUserName);
    request.append("password", enteredPassword);
    authCtx.login(request);
  };

  return (
    <section
      className="main"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="container">
        <div className="form-wrapper">
          <form action="" className="form fadeInDown" onSubmit={submitHandler}>
            <img alt="logo" src={Logo} className="logo" />
            <p>let's sign you in</p>
            <div className="text_field">
              <input type="text" required ref={userNameRef} />
              <span></span>
              <label>Username</label>
            </div>
            <div className="text_field">
              <input type="password" required ref={passwordRef} />
              <span></span>
              <label>Password</label>
            </div>

            {authCtx.valid ? (
              <></>
            ) : (
              <h5 className="text-danger text fade-in-text">
                Invalid userame or password please try again.
              </h5>
            )}

            <input className="login-btn" type="submit" value="Login" />
            <div className="forgot">
              <a href="mailto:admin@psutportal.com?subject=Forgot Password&body=Dear Admin,%0D%0A%0D%0AThis is to inform you that I have no access to login account for the portal (Invalid Username or password).%0D%0AI believe I have forgotton my password, Kindly provide a temporary password to allow access.%0D%0A%0D%0AThank you in advance.%0D%0A">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
