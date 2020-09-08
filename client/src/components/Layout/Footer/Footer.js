import React from "react";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="myFooter">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h5>Get started</h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sign">Sign up</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <h5>About us</h5>
            <ul>
              <li>
                <Link to="#">Find Us</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <Link to="#">Reviews</Link>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <h5>Support</h5>
            <ul>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Help desk</Link>
              </li>
              <li>
                <Link to="#">Forums</Link>
              </li>
            </ul>
          </div>
          <div className="col-4 info">
            <h5>Information</h5>
            <p>&copy; Built by Gabriel Jeffrey, For his portfolio purpose.</p>
          </div>
        </div>
      </div>
      <div className="second-bar">
        <div className="container">
          <h2 className="logo">
            <Link to="#">L'Espresso</Link>
          </h2>
          <div className="social-icons">
            <Link to="#" className="twitter">
              <i className="fa fa-twitter"></i>
            </Link>
            <Link to="#" className="facebook">
              <i className="fa fa-facebook"></i>
            </Link>
            <Link to="#" className="google">
              <i className="fa fa-google-plus"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
