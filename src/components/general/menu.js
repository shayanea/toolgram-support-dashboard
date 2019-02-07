import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router";

import styled from "styled-components";
import { Sweetalert, Menu } from "zent";

const { MenuItem, SubMenu } = Menu;

class MenuListContainer extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    })
  };

  state = {
    firstName: "",
    lastName: ""
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.profile.data !== null && this.props.profile.data !== prevProps.profile.data) {
      this.setState({ firstName: this.props.profile.data.firstName, lastName: this.props.profile.data.lastName });
    }
  }

  onMenuItemClicked = (e, key) => {
    switch (key) {
      case "1-1":
        this.props.history.push("/user/list");
        break;
      case "1-2":
        this.props.history.push("/user/list");
        break;
      case "2-1":
        this.props.history.push("/channel/list");
        break;
      case "2-2":
        this.props.history.push("/channel/list");
        break;
      case "3-1":
        this.props.history.push("/post/list");
        break;
      case "3-2":
        this.props.history.push("/post/list");
        break;
      case "5-1":
        this.props.history.push("/Withdrawals/list");
        break;
      case "5-2":
        this.props.history.push("/transaction/list");
      case "5-3":
        this.props.history.push("/balances/list");
        break;
      case "6-1":
        this.props.history.push("/feedback/list");
        break;
      default:
        this.props.history.push("/");
        break;
    }
  };

  logout = () => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "بله",
      cancelText: "منصرف شدم",
      content: "آیا مطمئن به خارج شدن از پنل پشتیبانی خود هستید ؟",
      title: "",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () => {
        this.props.logoutUser();
        this.props.history.push("/login");
      }
    });
  };

  render() {
    const { isLoading } = this.props.profile;
    const { firstName, lastName } = this.state;
    return (
      <MenuContainer>
        <LogoContainer>
          <span>Toolgram</span>
        </LogoContainer>
        <Menu mode="inline" onClick={this.onMenuItemClicked}>
          <MenuItem>پیشخوان</MenuItem>
          <SubMenu title="کاربران‌ها">
            <MenuItem key="1-1">فهرست کاربران‌ها</MenuItem>
            <MenuItem key="1-2">کاربران غیر فعال</MenuItem>
          </SubMenu>
          <SubMenu title="کانال‌ها">
            <MenuItem key="2-1">فهرست کانال‌ها</MenuItem>
            <MenuItem key="2-2">کانال‌ها‌ی غیر فعال</MenuItem>
          </SubMenu>
          <MenuItem key="3-1">فهرست پست‌ها</MenuItem>
          <SubMenu title="دریافت‌ها و پرداخت‌ها">
            <MenuItem key="5-1">درخواست‌های برداشت</MenuItem>
            <MenuItem key="5-2">سوابق مالی</MenuItem>
            <MenuItem key="5-3">سوابق مالی کاربران</MenuItem>
          </SubMenu>
          <MenuItem key="6-1">ایتم‌های فروشگاه</MenuItem>
          <MenuItem key="7-1">پیام‌ها</MenuItem>
          <MenuItem key="8-1">کد تخفیف</MenuItem>
          <MenuItem>تنظیمات</MenuItem>
        </Menu>
        {!isLoading && (
          <UserContainer>
            <UserInfo>
              {firstName} {lastName}
            </UserInfo>
            <span onClick={() => this.logout()} />
          </UserContainer>
        )}
      </MenuContainer>
    );
  }
}

const WrappedForm = withRouter(MenuListContainer);

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    logoutUser
  }
)(WrappedForm);

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #22222c;
  border-left: 1px solid #22222c;
  width: 250px;
`;

const LogoContainer = styled.div`
  border-bottom: 1px solid rgb(49, 49, 49);
  padding: 10px 25px;
  & span {
    font-size: 18px;
    color: #fff;
  }
`;

const UserContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-top: 1px solid rgb(49, 49, 49);
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e2f3b;
    transition: background-color 0.3s ease;
  }
  & span {
    position: absolute;
    left: 20px;
    top: 55%;
    transform: translate(0, -50%);
    width: 18px;
    height: 18px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 18px;
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMzAgMzMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMzAgMzMwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlhNTElEXzJfIj4KCTxwYXRoIGlkPSJYTUxJRF80XyIgZD0iTTUxLjIxMywxODBoMTczLjc4NWM4LjI4NCwwLDE1LTYuNzE2LDE1LTE1cy02LjcxNi0xNS0xNS0xNUg1MS4yMTNsMTkuMzk0LTE5LjM5MyAgIGM1Ljg1OC01Ljg1Nyw1Ljg1OC0xNS4zNTUsMC0yMS4yMTNjLTUuODU2LTUuODU4LTE1LjM1NC01Ljg1OC0yMS4yMTMsMEw0LjM5NywxNTQuMzkxYy0wLjM0OCwwLjM0Ny0wLjY3NiwwLjcxLTAuOTg4LDEuMDkgICBjLTAuMDc2LDAuMDkzLTAuMTQxLDAuMTkzLTAuMjE1LDAuMjg4Yy0wLjIyOSwwLjI5MS0wLjQ1NCwwLjU4My0wLjY2LDAuODkxYy0wLjA2LDAuMDktMC4xMDksMC4xODUtMC4xNjgsMC4yNzYgICBjLTAuMjA2LDAuMzIyLTAuNDA4LDAuNjQ3LTAuNTksMC45ODZjLTAuMDM1LDAuMDY3LTAuMDY0LDAuMTM4LTAuMDk5LDAuMjA1Yy0wLjE4OSwwLjM2Ny0wLjM3MSwwLjczOS0wLjUzLDEuMTIzICAgYy0wLjAyLDAuMDQ3LTAuMDM0LDAuMDk3LTAuMDUzLDAuMTQ1Yy0wLjE2MywwLjQwNC0wLjMxNCwwLjgxMy0wLjQ0MiwxLjIzNGMtMC4wMTcsMC4wNTMtMC4wMjYsMC4xMDgtMC4wNDEsMC4xNjIgICBjLTAuMTIxLDAuNDEzLTAuMjMyLDAuODMtMC4zMTcsMS4yNTdjLTAuMDI1LDAuMTI3LTAuMDM2LDAuMjU4LTAuMDU5LDAuMzg2Yy0wLjA2MiwwLjM1NC0wLjEyNCwwLjcwOC0wLjE1OSwxLjA2OSAgIEMwLjAyNSwxNjMuOTk4LDAsMTY0LjQ5OCwwLDE2NXMwLjAyNSwxLjAwMiwwLjA3NiwxLjQ5OGMwLjAzNSwwLjM2NiwwLjA5OSwwLjcyMywwLjE2LDEuMDhjMC4wMjIsMC4xMjQsMC4wMzMsMC4yNTEsMC4wNTgsMC4zNzQgICBjMC4wODYsMC40MzEsMC4xOTYsMC44NTIsMC4zMTgsMS4yNjljMC4wMTUsMC4wNDksMC4wMjQsMC4xMDEsMC4wMzksMC4xNWMwLjEyOSwwLjQyMywwLjI4LDAuODM2LDAuNDQ1LDEuMjQ0ICAgYzAuMDE4LDAuMDQ0LDAuMDMxLDAuMDkxLDAuMDUsMC4xMzVjMC4xNiwwLjM4NywwLjM0MywwLjc2MSwwLjUzNCwxLjEzYzAuMDMzLDAuMDY1LDAuMDYxLDAuMTMzLDAuMDk1LDAuMTk4ICAgYzAuMTg0LDAuMzQxLDAuMzg3LDAuNjY5LDAuNTk2LDAuOTk0YzAuMDU2LDAuMDg4LDAuMTA0LDAuMTgxLDAuMTYyLDAuMjY3YzAuMjA3LDAuMzA5LDAuNDM0LDAuNjAzLDAuNjYyLDAuODk1ICAgYzAuMDczLDAuMDk0LDAuMTM4LDAuMTkzLDAuMjEzLDAuMjg1YzAuMzEzLDAuMzc5LDAuNjQxLDAuNzQzLDAuOTg4LDEuMDlsNDQuOTk3LDQ0Ljk5N0M1Mi4zMjIsMjIzLjUzNiw1Ni4xNjEsMjI1LDYwLDIyNSAgIHM3LjY3OC0xLjQ2NCwxMC42MDYtNC4zOTRjNS44NTgtNS44NTgsNS44NTgtMTUuMzU1LDAtMjEuMjEzTDUxLjIxMywxODB6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBpZD0iWE1MSURfNV8iIGQ9Ik0yMDcuMjk5LDQyLjI5OWMtNDAuOTQ0LDAtNzkuMDM4LDIwLjMxMi0xMDEuOTAzLDU0LjMzM2MtNC42Miw2Ljg3NS0yLjc5MiwxNi4xOTUsNC4wODMsMjAuODE2ICAgYzYuODc2LDQuNjIsMTYuMTk1LDIuNzk0LDIwLjgxNy00LjA4M2MxNy4yODEtMjUuNzE1LDQ2LjA2Ny00MS4wNjcsNzcuMDAzLTQxLjA2N0MyNTguNDE0LDcyLjI5OSwzMDAsMTEzLjg4NCwzMDAsMTY1ICAgcy00MS41ODYsOTIuNzAxLTkyLjcwMSw5Mi43MDFjLTMwLjg0NSwwLTU5LjU4NC0xNS4yODMtNzYuODc4LTQwLjg4MWMtNC42MzktNi44NjUtMTMuOTYxLTguNjY5LTIwLjgyNy00LjAzMiAgIGMtNi44NjQsNC42MzgtOC42NywxMy45NjItNC4wMzIsMjAuODI2YzIyLjg4MSwzMy44NjgsNjAuOTEzLDU0LjA4NywxMDEuNzM3LDU0LjA4N0MyNzQuOTU2LDI4Ny43MDEsMzMwLDIzMi42NTgsMzMwLDE2NSAgIFMyNzQuOTU2LDQyLjI5OSwyMDcuMjk5LDQyLjI5OXoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
  }
`;

const UserInfo = styled.div`
  font-size: 13px;
  color: #fff;
  font-family: "SAMIMBOLD";
`;
