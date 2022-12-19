import React from "react";
import { Link } from "react-router-dom";
import "../CSS/404.css";
import "../index.css";
import errorImg from "../img/404.gif";
export default function Error404() {
  return (
    <section className="section-404 spaces-padding-bottom-50">
      <div className="container">
        <img src={errorImg} title="img" />
        {/* <h3>404</h3> */}
        <h2 className="mb-5">The page you requested was not found</h2>

        <Link to="/" className="btn-send">
          Back to home page
        </Link>
      </div>
    </section>
  );
}
