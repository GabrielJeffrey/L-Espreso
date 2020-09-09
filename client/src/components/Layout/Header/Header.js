import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

import { logout } from "../../../store/actions/auth";
import Cart from "../../Cart/Cart";

const Header = ({ user, loading, logout }) => {
  let location = useLocation();

  const [accDrop, setAccDrop] = useState({});
  const [isActive, setIsActive] = useState(false);

  let header;

  const handleLogout = () => {
    logout();
  };

  const handleCartPos = () => {
    setIsActive(!isActive);
  };

  if (location.pathname === "/sign") {
    header = (
      <header className="header-sign">
        <nav className="nav">
          <div className="nav__container">
            <div className="nav__logo">
              <h3 className="heading__teritiary">
                <Link to="/">
                  <span>L'Espresso</span>
                </Link>
              </h3>
            </div>
            <div className="nav__menu nav__link">
              <NavLink to="/menu">Menu</NavLink>
            </div>
          </div>
        </nav>
      </header>
    );
  } else {
    header = (
      <header className="header-normal">
        <nav className="nav">
          <div className="nav__container">
            <div className="nav__logo">
              <h3 className="heading__teritiary">
                <Link to="/">
                  <span>L'Espresso</span>
                </Link>
              </h3>
            </div>
            <div className="nav__menu nav__link">
              <NavLink to="/menu">Menu</NavLink>
            </div>
            <div className="nav__login nav__link">
              <NavLink to="/sign">Login</NavLink>
            </div>
            <div className="nav__signup nav__link nav__link--active">
              <NavLink to="/sign">Sign Up</NavLink>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  if (user) {
    header = (
      <header className="header-normal">
        <nav className="nav">
          <div className="nav__container">
            <div className="nav__logo">
              <h3 className="heading__teritiary">
                <Link to="/">
                  <span>L'Espresso</span>
                </Link>
              </h3>
            </div>
            <div className="nav__menu nav__link">
              <NavLink to="/menu">
                <div className="content">Menu</div>
              </NavLink>
            </div>
            <div
              onMouseEnter={() => setAccDrop({ transform: "scaleY(1)" })}
              onMouseLeave={() => setAccDrop({ transform: "scaleY(0)" })}
              className="nav__account nav__link"
            >
              <div className="wrapper">
                <img src={`/images/user/${user.avatar}`} alt={user.name} />
                <div className="name">{user.name.split(' ')[0]}</div>
              </div>
              <div style={accDrop} className="content">
                <NavLink to="/me">My Account</NavLink>
                <NavLink to="/me/orders">My Orders</NavLink>
                <NavLink to="/me/settings">Setting</NavLink>
                <Link to="/sign" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
            <div onClick={handleCartPos} className="nav__cart nav__link">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
        </nav>

        <Cart isActive={isActive} handleClose={handleCartPos} />
      </header>
    );
  }

  if (loading) {
    header = <header className="header-sign"></header>;
  }

  return header;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Header);
