import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import styled from "styled-components";
import { Spinner } from "../../Layout/Spinner/Spinner";

class Account extends PureComponent {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    newPass: "",
  };

  handleOnChange = (e, key) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  render() {
    let content = (
      <AreaHolder>
        <Spinner />
      </AreaHolder>
    );

   

    if (this.props.isAuth && !this.props.loading) {
      content = (
        <main className="main__account" id="account__container">
          <div className="user-view">
            <section className="user-view__menu">
              <ul className="side-nav">
                <li className="side-nav--active">
                  <ion-icon name="cog-outline"></ion-icon>
                  <a href="#">Settings</a>
                </li>
                <li>
                  <ion-icon name="fast-food-outline"></ion-icon>
                  <a href="#">My Orders</a>
                </li>
                <li>
                  <ion-icon name="reader-outline"></ion-icon>
                  <a href="#">My reviews</a>
                </li>
                <li>
                  <ion-icon name="receipt-outline"></ion-icon>
                  <a href="#">Billing</a>
                </li>
              </ul>
              <div className="admin-nav">
                <h5 className="admin-nav__heading">Admin</h5>
                <ul className="side-nav">
                  <li>
                    <Link to="manage/dishes">Manage Dishes</Link>
                  </li>
                  <li>
                    <Link to="manage/users">Manage users</Link>
                  </li>
                  <li>
                    <Link to="manage/reviews">Manage reviews</Link>
                  </li>
                </ul>
              </div>
            </section>

            <div className="user-view--wrapper">
              <div className="user-view__form-container">
                <h2 className="heading__teritiary heading__teritiary--underlined">
                  Account Settings
                </h2>
                <form className="form form-user-data">
                  <div className="form__group">
                    <label className="form__label" for="name">
                      Name
                    </label>
                    <input
                      className="form__input"
                      id="name"
                      type="text"
                      value={this.state.name}
                      placeholder={this.props.user.name}
                      onChange={(e) => this.handleOnChange(e, "name")}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" for="email">
                      Email address
                    </label>
                    <input
                      className="form__input"
                      id="email"
                      type="email"
                      placeholder={this.props.user.email}
                      value={this.state.email}
                      onChange={(e) => this.handleOnChange(e, "email")}
                      required
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img
                      className="form__user-photo"
                      src={`/images/user/${this.props.user.avatar}`}
                      alt="User avatar"
                    />
                    <a href="#">upload new avatar</a>
                  </div>
                  <div className="form__group">
                    <button className="form__submit">Submit</button>
                  </div>
                </form>
              </div>
              <div className="line">&nbsp;</div>
              <div className="user-view__form-container">
                <h2 className="heading__teritiary heading__teritiary--underlined">
                  Password change
                </h2>
                <form className="form form-user-settings">
                  <div className="form__group">
                    <label className="form__label" for="password-current">
                      Current password
                    </label>
                    <input
                      className="form__input"
                      id="password-current"
                      type="password"
                      placeholder="••••••••"
                      required
                      minlength="8"
                      value={this.state.password}
                      onChange={(e) => this.handleOnChange(e, "password")}
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" for="password">
                      New password
                    </label>
                    <input
                      className="form__input"
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minlength="8"
                      value={this.state.confirmPass}
                      onChange={(e) => this.handleOnChange(e, "confirmPass")}
                    />
                  </div>
                  <div className="form__group ma-bt-lg">
                    <label className="form__label" for="password-confirm">
                      Confirm password
                    </label>
                    <input
                      className="form__input"
                      id="password-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      minlength="8"
                      value={this.state.newPass}
                      onChange={(e) => this.handleOnChange(e, "newPass")}
                    />
                  </div>
                  <div className="form__group">
                    <button className="form__submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      );
    } else if (!this.props.isAuth) content = <Redirect to="/sign" />;

    return content;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const AreaHolder = styled.div`
  height: 100vh;
  width: 100%;

  position: relative;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ::after {
      border: 6px solid rgb(22, 30, 79);
      border-color: rgb(22, 30, 79) transparent rgb(22, 30, 79) transparent;
    }
  }
`;

export default connect(mapStateToProps)(Account);
