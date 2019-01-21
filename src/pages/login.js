import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";

import styled from "styled-components";
import Logo from "../assets/images/Toolgram.png";

import { Form, Button } from "zent";

const { FormInputField, createForm } = Form;

class login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    })
  };

  submit = data => {
    this.props.loginUser({
      email: data.email,
      password: data.password,
      rememberMe: true
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading } = this.props.auth;
    return (
      <Login>
        <LoginContainer>
          <Form disableEnterSubmit={false} className="login-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <LogoContainer>
              <img src={Logo} className="logo" alt="Toolgram" />
            </LogoContainer>
            <FormInputField
              name="email"
              type="text"
              label=""
              placeholder="نام کاربری"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: " نام کاربری اجباری است."
              }}
            />
            <FormInputField
              name="password"
              type="password"
              label=""
              placeholder="رمز عبور"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: " کلمه عبور اجباری است."
              }}
            />
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
              ورود
            </Button>
            <ForgetPassword>
              <Link to="/forgotpassword">فراموشی رمز عبور</Link>
            </ForgetPassword>
          </Form>
        </LoginContainer>
      </Login>
    );
  }
}

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  min-height: 100vh;
`;

const LoginContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 5px 20px 0 rgba(179, 179, 179, 0.5);
  border: 1px solid #bbb;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  & img {
    height: 35px;
  }
`;

const ForgetPassword = styled.div`
  font-size: 14px;
  padding: 15px 0;
  & a {
    color: #2576cc;
  }
`;

const WrappedForm = createForm()(login);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(WrappedForm);
