import React, { Component } from "react";
import styled from "styled-components";
import { Notify, Form, Button, Loading } from "zent";

import axios from "../utils/requestConfig";

const { FormInputField, Fieldset, createForm } = Form;

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variables: null,
      isLoaded: false,
      isLoading: false
    };
  }

  componentDidMount() {
    this.getSettings();
  }

  getSettings = () => {
    return axios
      .get(`/appsettings`)
      .then(res => {
        this.setState({ variables: res.data.data, isLoaded: true });
      })
      .catch(err => {
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      });
  };

  submit = data => {
    this.setState({ isLoading: true });
    return axios
      .put(`/appsettings`, {
        financialOptions: {
          minimumAmountForCharge: data.minimumAmountForCharge,
          minimumAmountForWithdrawal: data.minimumAmountForWithdrawal
        },
        registrationGift: {
          projectCredit: data.projectCredit,
          scheduledPostCredit: data.scheduledPostCredit,
          telegramChannelCredit: data.telegramChannelCredit,
          twitterChannelCredit: data.twitterChannelCredit,
          linkedinChannelCredit: data.linkedinChannelCredit
        }
      })
      .then(res => {
        Notify.success("اطلاعات شما با موفقیت به روز رسانی گردید.", 5000);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { variables, isLoaded, isLoading } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">تنظیمات</h2>
          </Col>
          <Col />
        </SearchConatainer>
        {!isLoaded ? (
          <Loading show />
        ) : (
          <FormContainer>
            <Form disableEnterSubmit={false} className="setting-form" horizontal onSubmit={handleSubmit(this.submit)}>
              <Fieldset legend="تنظیمات مالی">
                <FormInputField
                  name="minimumAmountForCharge"
                  type="text"
                  label="حداقل شارژ:"
                  value={variables.financialOptions.minimumAmountForCharge}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
                <FormInputField
                  name="minimumAmountForWithdrawal"
                  type="text"
                  label="حداقل درخواست برداشت:"
                  value={variables.financialOptions.minimumAmountForWithdrawal}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
              </Fieldset>
              <Fieldset legend="هدایای ثبت نام">
                <FormInputField
                  name="linkedinChannelCredit"
                  type="text"
                  label="اکانت لینکدین:"
                  value={variables.registrationGift.linkedinChannelCredit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
                <FormInputField
                  name="projectCredit"
                  type="text"
                  label="ساخت پرژه:"
                  value={variables.registrationGift.projectCredit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
                <FormInputField
                  name="scheduledPostCredit"
                  type="text"
                  label="پست زمان بندی:"
                  value={variables.registrationGift.scheduledPostCredit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
                <FormInputField
                  name="telegramChannelCredit"
                  type="text"
                  label="اکانت تلگرام:"
                  value={variables.registrationGift.telegramChannelCredit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
                <FormInputField
                  name="twitterChannelCredit"
                  type="text"
                  label="اکانت توییتر:"
                  value={variables.registrationGift.twitterChannelCredit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validations={{
                    required: true
                  }}
                  validationErrors={{
                    required: " فیلد بالا اجباری است."
                  }}
                />
              </Fieldset>
              <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
                ثبت
              </Button>
            </Form>
          </FormContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 50px;
`;

const SearchConatainer = styled.div`
  padding: 25px;
  background-color: #22222c;
  border-radius: 4px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Col = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const FormContainer = styled.div`
  background-color: #22222c;
  border-radius: 4px;
  padding: 25px;
`;

const WrappedForm = createForm()(Setting);

export default WrappedForm;
