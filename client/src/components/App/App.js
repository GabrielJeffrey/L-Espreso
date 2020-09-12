import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ThemeProvider from "../../provider/ThemeProvider";

import { Footer } from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";

import Home from "../pages/Home/Home";
import Sign from "../Sign/Sign";
import Menu from "../pages/Menu/Menu";
import Dish from "../pages/Dish/Dish";
import Account from "../pages/Account/Account";

import { loadUser } from "../../store/actions/auth";

import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Alert from "../Layout/Alert/Alert";

class App extends PureComponent {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Router>
        <ScrollToTop />
        
        <Header />
        <Alert />
        <Switch>
          <Route path="/sign" exact component={Sign} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/menu/:dish" component={Dish} />
          <Route path="/me/:sub" exact component={Account} />
        </Switch>

        <Route
          path="/"
          exact
          render={() => (
            <ThemeProvider>
              <Home />
            </ThemeProvider>
          )}
        />
        <Footer />
      </Router>
    );
  }
}

export default connect(null, { loadUser })(App);
