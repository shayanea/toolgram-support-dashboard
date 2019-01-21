import React, { Component } from "react";
import axios from "../utils/requestConfig";

import styled from "styled-components";
import Logo from "../assets/images/Toolgram.png";

import { Form, Button, Notify } from "zent";

const { FormInputField, createForm } = Form;

class forgotPassword extends Component {
  state = {
    isLoading: false
  };

  submit = data => {
    this.setState({ isLoading: true });
    axios
      .post("/accounts/resetpasswordrequests", { email: data.email })
      .then(res => {
        Notify.success("ایمیل خود را برای تغییر پسورد چک نمایید.", 5000);
        this.props.history.push("/login");
      })
      .catch(err => {
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading } = this.state;
    return (
      <ForgetPassword>
        <ForgotPasswordContainer>
          <Form disableEnterSubmit={false} className="login-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <LogoContainer>
              <img src={Logo} className="logo" alt="Toolgram" />
            </LogoContainer>
            <FormInputField
              name="email"
              type="text"
              label=""
              placeholder="ایمیل"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                isEmail: true,
                required: true
              }}
              validationErrors={{
                isEmail: "فرمت ایمیل را رعایت نمایید.",
                required: " ایمیل اجباری است."
              }}
            />
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
              ثبت
            </Button>
          </Form>
        </ForgotPasswordContainer>
      </ForgetPassword>
    );
  }
}

const ForgetPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  min-height: 100vh;
`;

const ForgotPasswordContainer = styled.div`
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

const WrappedForm = createForm()(forgotPassword);

export default WrappedForm;
