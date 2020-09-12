import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QueryString from "query-string";

import chefSign from "../../resources/images/sign/chef-sign.png";

import styled from "styled-components";

import { WobbleErrorForm } from "../../utils/animations";

import { register, login } from "../../store/actions/auth";

import { Spinner } from "../Layout/Spinner/Spinner";

class Sign extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      },
      errorMessage: null,
      login: false,
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const query = QueryString.parse(this.props.location.search);
      const isTrue = query.login;
      this.setState({ login: isTrue === "true" ? true : false });
    }
  }

  handleOnSumbmit = async (e) => {
    e.preventDefault();
    if (!this.props.loading) {
      if (this.state.form.password !== this.state.form.confirmPass && !this.state.login) {
        this.setState({
          errorMessage: "Passwords Didnt Matched!",
        });
        setTimeout(() => {
          this.setState({
            errorMessage: null,
          });
        }, 5000);

        return;
      }

      if (this.state.login) {
        const body = JSON.stringify({
          email: this.state.form.email,
          password: this.state.form.password,
        });

        this.props.login(body);

        return;
      } else {
        const data = JSON.stringify(this.state.form);
        this.props.register(data);
      }
    }
  };

  handleOnChange = (e, key) => {
    e.persist();
    this.setState((prevState) => ({
      form: { ...prevState.form, [key]: e.target.value },
    }));
  };

  handleOnClick = (e) => {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  };

  render() {
    let error = this.state.errorMessage;

    const { name, email, password, confirmPass } = this.state.form;

    let content = (
      <div className="sign">
        <div className="sign__content">
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="triangle triangle-3"></div>
          <figure className="chef__sign top">
            <img src={chefSign} alt="chef welcoming you" />
          </figure>
          <h2 className="heading__secondary">Embark on a delicious adventure today!</h2>
        </div>

        <div className="sign__form">
          {error && <WobbleErrorForm className="sign__form--erorr">{error}</WobbleErrorForm>}

          <form action="#" onSubmit={this.handleOnSumbmit} className="form">
            <Tabs login={this.state.login} className="sign__form--tabs">
              <div onClick={this.handleOnClick} className="sign-up--tab">
                <p>Sign Up</p>
              </div>
              <div onClick={this.handleOnClick} className="sign-in--tab">
                <p>Log in</p>
              </div>
            </Tabs>

            {this.state.login ? (
              <div
                className="form__group"
                style={{
                  transform: "translateX(150%)",
                }}
              >
                <input
                  type="text"
                  id="name"
                  className="form__input"
                  placeholder="User Name"
                  minLength="6"
                  value={name}
                  onChange={(e) => this.handleOnChange(e, "name")}
                />
                <label htmlFor="name" className="form__label">
                  User name
                </label>
              </div>
            ) : (
              <div className="form__group">
                <input
                  type="text"
                  id="name"
                  className="form__input"
                  placeholder="User Name"
                  minLength="6"
                  value={name}
                  required
                  onChange={(e) => this.handleOnChange(e, "name")}
                />
                <label htmlFor="name" className="form__label">
                  User name
                </label>
              </div>
            )}

            {this.state.login ? (
              <div className="form__group" style={{ transform: "translateY(-80%)" }}>
                <input
                  type="email"
                  id="email"
                  className="form__input"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => this.handleOnChange(e, "email")}
                />
                <label htmlFor="email" className="form__label">
                  Email Address
                </label>
              </div>
            ) : (
              <div className="form__group">
                <input
                  type="email"
                  id="email"
                  className="form__input"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => this.handleOnChange(e, "email")}
                />
                <label htmlFor="email" className="form__label">
                  Email Address
                </label>
              </div>
            )}
            <div className="pass-wrapper">
              {this.state.login ? (
                <div
                  className="form__group"
                  style={{ transform: "translateY(-50%)", width: "80%" }}
                >
                  <input
                    type="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    minLength="8"
                    value={password}
                    onChange={(e) => this.handleOnChange(e, "password")}
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                </div>
              ) : (
                <div className="form__group">
                  <input
                    type="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    minLength="8"
                    value={password}
                    onChange={(e) => this.handleOnChange(e, "password")}
                    required
                  />
                  <label htmlFor="password" className="form__label">
                    Password
                  </label>
                </div>
              )}
              {this.state.login ? (
                <div
                  className="form__group"
                  style={{
                    transform: "translateX(150%)",
                  }}
                >
                  <input
                    type="password"
                    id="password-confirm"
                    className="form__input"
                    placeholder="Confirm Password"
                    minLength="8"
                    value={confirmPass}
                    onChange={(e) => this.handleOnChange(e, "confirmPass")}
                    autoComplete="off"
                  />
                  <label htmlFor="password-confirm" className="form__label">
                    Confirm password
                  </label>
                </div>
              ) : (
                <div className="form__group">
                  <input
                    type="password"
                    id="password-confirm"
                    className="form__input"
                    placeholder="Confirm Password"
                    minLength="8"
                    required
                    value={confirmPass}
                    onChange={(e) => this.handleOnChange(e, "confirmPass")}
                    autoComplete="off"
                  />
                  <label htmlFor="password-confirm" className="form__label">
                    Confirm password
                  </label>
                </div>
              )}
            </div>
            {this.state.login ? (
              <div className="form__group checkbox" style={{ transform: "translateX(150%)" }}>
                <input type="checkbox" id="checkbox" className="form__input" />
                <label htmlFor="checkbox" className="form__label">
                  Accept Terms & Conditions
                </label>
              </div>
            ) : (
              <div className="form__group checkbox">
                <input type="checkbox" id="checkbox" className="form__input" required />
                <label htmlFor="checkbox" className="form__label">
                  Accept Terms & Conditions
                </label>
              </div>
            )}
            {this.state.login ? (
              <div className="form__group" style={{ transform: "translateY(-70%)" }}>
                <button className="form__submit">
                  {this.props.loading ? <Spinner /> : "Submit"}
                </button>
              </div>
            ) : (
              <div className="form__group">
                <button className="form__submit">
                  {this.props.loading ? <Spinner /> : "Submit"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );

    if (this.props.isAuth) {
      content = <Redirect to="/menu" />;
    }

    return content;
  }
}

const Tabs = styled.div`
  ::after {
    content: "";
    position: absolute;
    ${(props) => (props.login ? "left: 51%;" : "left: 0;")}
    height: 100%;
    width: 50%;
    z-index: 50;
    background-color: rgb(242, 0, 255);
    transition: all 0.5s cubic-bezier(1, 0, 0, 1);
  }
`;

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { register, login })(Sign);
