import React, { Component } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { history } from "./utils/history";
import store from "./store";
import styled from "styled-components";

import "zent/css/index.css";
import "./assets/css/style.css";

import Menu from "./components/general/menu";

import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import Users from "./pages/users";
import Posts from "./pages/posts";
import Channels from "./pages/channels";
import Feedback from "./pages/feedback";
import Transaction from "./pages/transaction";
import Withdrawals from "./pages/withdrawals";

const isAuthenticated = () => {
  return store.getState().auth.isAuthenticated && localStorage.getItem("USER_INFO");
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const NoMatch = () =>
  store.getState().auth.isAuthenticated && localStorage.getItem("USER_INFO") ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true
    };
  }

  componentDidMount() {
    let currentRoute = history.location.pathname;
    this.setState({
      disable: currentRoute === "/login" || currentRoute === "/forgotpassword"
    });
    this.changeTitle(currentRoute);
    history.listen(location => {
      let currentRoute = location.pathname;
      this.changeTitle(currentRoute);
      this.setState({
        disable: currentRoute === "/login" || currentRoute === "/forgotpassword"
      });
      window.scrollTo(0, 0);
    });
  }

  changeTitle = path => {
    switch (path) {
      case "/":
        return (document.title = "پیشخوان");
      case "/login":
        return (document.title = "ورود کاربران");
      case "/forgotpassword":
        return (document.title = "فراموشی رمز عبور");
      case "/user/list":
        return (document.title = "لیست کاربران");
      case "/post/list":
        return (document.title = "لیست پست‌ها");
      case "/channel/list":
        return (document.title = "لیست کانال‌ها");
      case "/transaction/list":
        return (document.title = "لیست سابقه مالی‌ها");
      case "/withdraw/list":
        return (document.title = "درخواست‌های برداشت");
      case "/feedback/list":
        return (document.title = "لیست پیام‌ها");
      default:
        return this.handleRouteWithParams(path);
    }
  };

  handleRouteWithParams = path => {};

  render() {
    const { disable } = this.state;
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="dashboard">
            <Container disable={disable}>
              {!disable ? <Menu /> : null}
              <Switch>
                {/* Dashboard */}
                <AuthRoute exact path="/" component={Users} />
                {/* Users */}
                <AuthRoute exact path="/user/list" component={Users} />
                {/* Posts */}
                <AuthRoute exact path="/post/list" component={Posts} />
                {/* Channels */}
                <AuthRoute exact path="/channel/list" component={Channels} />
                {/* Feedback */}
                <AuthRoute exact path="/feedback/list" component={Feedback} />
                {/* Transaction */}
                <AuthRoute exact path="/transaction/list" component={Transaction} />
                <AuthRoute exact path="/Withdrawals/list" component={Withdrawals} />
                {/* Authentication */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotpassword" component={ForgotPassword} />
                {/* 404 */}
                <Route component={NoMatch} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

const Container = styled.div`
  display: block;
  background-color: #2e2f3b;
  min-height: 100vh;
  margin-right: ${props => (props.disable ? 0 : "250px")};
`;

export default App;
