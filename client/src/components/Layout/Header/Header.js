import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";

import { logout } from "../../../store/actions/auth";

import Cart from "./Cart/Cart";

class Header extends PureComponent {
  state = {
    accDrop: {},
    isActive: false,
  };

  handleLogout = () => {
    this.props.logout();
  };

  handleCartPos = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart.length > prevProps.cart.length && !this.state.isActive) {
      if (this.props.cart.length !== 0) {
        this.setState({ isActive: true });
      }
    }
  }

  render() {
    let header;

    if (this.props.location.pathname === "/sign") {
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

    if (this.props.user) {
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
                onMouseEnter={() => this.setState({ accDrop: { transform: "scaleY(1)" } })}
                onMouseLeave={() => this.setState({ accDrop: { transform: "scaleY(0)" } })}
                className="nav__account nav__link"
              >
                <div className="wrapper">
                  <img src={`/images/user/${this.props.user.avatar}`} alt={this.props.user.name} />
                  <div className="name">
                    {this.props.user.name && this.props.user.name.includes(" ")
                      ? this.props.user.name.split(" ")[0]
                      : this.props.user.name}
                  </div>
                </div>
                <div style={this.state.accDrop} className="content">
                  <NavLink to="/me">My Account</NavLink>
                  <NavLink to="/me/orders">My Orders</NavLink>
                  <NavLink to="/me/settings">Setting</NavLink>
                  <Link to="/sign" onClick={this.handleLogout}>
                    Logout
                  </Link>
                </div>
              </div>
              <div onClick={this.handleCartPos} className="nav__cart nav__link">
                <ion-icon name="cart-outline"></ion-icon>
              </div>
            </div>
          </nav>

          <Cart
            cart={this.props.cart}
            isActive={this.state.isActive}
            handleClose={this.handleCartPos}
          />
        </header>
      );
    }

    if (this.props.loading && this.props.location.pathname !== "/sign") {
      header = <header className="header-normal"></header>;
    }

    return header;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logout })(withRouter(Header));
