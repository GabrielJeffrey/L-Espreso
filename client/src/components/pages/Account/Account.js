import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import styled from "styled-components";
import { Spinner } from "../../Layout/Spinner/Spinner";
import { Backdrop } from "../../Backdrop/Backdrop";

import { setAlert } from "../../../store/actions/alert";
import { updateUser, updatePassword } from "../../../store/actions/account";

class Account extends PureComponent {
  state = {
    name: "",
    email: "",
    avatar: "",
    password: "",
    confirmPass: "",
    newPass: "",
    isActive: false,
  };

  componentDidMount() {
    if (this.props.user) {
      this.setState({ avatar: this.props.user.avatar });
    }
  }

  handleOnChange = (e, key) => {
    e.persist();
    this.setState((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  handleSubmitAcc = (e) => {
    e.preventDefault();
    if (this.state.email !== "" && !this.state.email.includes("@")) {
      return this.props.setAlert("Please Enter a valid Email Address", "danger");
    }

    const body = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
    };

    console.log(this.state.name, this.state.email);

    if (this.state.name === "" || !this.state.name) {
      body.name = this.props.user.name;
    }
    if (this.state.email === "" || !this.state.email) {
      body.email = this.props.user.email;
    }
    this.props.updateUser(body);
  };

  handleSubmitPass = (e) => {
    e.preventDefault();
    const body = {
      password: this.state.password,
      confirmPass: this.state.confirmPass,
      newPass: this.state.newPass,
    };
    this.props.updatePassword(body);
  };

  handleClickAva = () => this.setState((prevState) => ({ isActive: !prevState.isActive }));
  handleAvatarSelect = (e, avatar) => this.setState({ avatar });

  render() {
    const { sub } = this.props.match.params;

    const avatars = ["default", "profile", "programmer", "woman"];

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
                <li
                  className={this.props.match.params.sub === "settings" ? "side-nav--active" : null}
                >
                  <ion-icon name="cog-outline"></ion-icon>
                  <Link to="/me/settings">Settings</Link>
                </li>
                <li
                  className={this.props.match.params.sub === "orders" ? "side-nav--active" : null}
                >
                  <ion-icon name="fast-food-outline"></ion-icon>
                  <Link to="/me/orders">My Orders</Link>
                </li>
                <li
                  className={this.props.match.params.sub === "reviews" ? "side-nav--active" : null}
                >
                  <ion-icon name="reader-outline"></ion-icon>
                  <Link to="/me/reviews">My reviews</Link>
                </li>
                <li
                  className={this.props.match.params.sub === "billing" ? "side-nav--active" : null}
                >
                  <ion-icon name="receipt-outline"></ion-icon>
                  <Link to="/me/billing">Billing</Link>
                </li>
              </ul>
              {this.props.user.role === "admin" ? (
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
              ) : null}
            </section>

            <div className="user-view--wrapper">
              {sub === "settings" ? (
                <>
                  <div className="user-view__form-container">
                    <h2 className="heading__teritiary heading__teritiary--underlined">
                      Account Settings
                    </h2>
                    <form className="form form-user-data">
                      <div className="form__group">
                        <label className="form__label" htmlFor="name">
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
                        <label className="form__label" htmlFor="email">
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
                          src={`/images/user/${this.state.avatar}`}
                          alt="User avatar"
                        />
                        <a className="small-link" onClick={this.handleClickAva}>
                          Set an avatar
                        </a>
                      </div>
                      {this.state.isActive && (
                        <div className="avatar__selection">
                          <Backdrop handle={this.handleClickAva} />
                          <div className="modal">
                            <ul>
                              {avatars.map((avatar, i) => (
                                <li
                                  key={avatar + i}
                                  onClick={(e) => this.handleAvatarSelect(e, `${avatar}.svg`)}
                                  className="avatar"
                                >
                                  <img
                                    className="avatar__img"
                                    src={`/images/user/${avatar}.svg`}
                                    alt={avatar}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      <div className="form__group">
                        <button onClick={this.handleSubmitAcc} className="form__submit">
                          {this.props.updateLoading ? <Spinner /> : "Submit"}
                        </button>
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
                        <label className="form__label" htmlFor="password-current">
                          Current password
                        </label>
                        <input
                          className="form__input"
                          id="password-current"
                          type="password"
                          placeholder="••••••••"
                          required
                          minLength="8"
                          value={this.state.password}
                          onChange={(e) => this.handleOnChange(e, "password")}
                        />
                      </div>
                      <div className="form__group">
                        <label className="form__label" htmlFor="password">
                          New password
                        </label>
                        <input
                          className="form__input"
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          minLength="8"
                          value={this.state.confirmPass}
                          onChange={(e) => this.handleOnChange(e, "confirmPass")}
                        />
                      </div>
                      <div className="form__group ma-bt-lg">
                        <label className="form__label" htmlFor="password-confirm">
                          Confirm password
                        </label>
                        <input
                          className="form__input"
                          id="password-confirm"
                          type="password"
                          placeholder="••••••••"
                          required
                          minLength="8"
                          value={this.state.newPass}
                          onChange={(e) => this.handleOnChange(e, "newPass")}
                        />
                      </div>
                      <div className="form__group">
                        <button onClick={this.handleSubmitPass} className="form__submit">
                          {this.props.updateLoading ? <Spinner /> : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </main>
      );
    } else if (!this.props.isAuth) content = <Redirect to="/sign" />;

    return content;
  }
}

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

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
  updateLoading: state.account.loading,
});

export default connect(mapStateToProps, { setAlert, updateUser, updatePassword })(Account);
