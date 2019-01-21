import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router";

import styled from "styled-components";
import { Sweetalert } from "zent";

class Menu extends Component {
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
        <MenuItemsContainer>
          <MenuItems>
            <MenuItem active>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" width="20" height="20">
                <g>
                  <g>
                    <g>
                      <path
                        d="M366.292,215.99L241.417,325.781c-0.167,0.146-0.333,0.292-0.479,0.448c-4.042,4.021-6.271,9.385-6.271,15.104     c0,11.76,9.563,21.333,21.333,21.333c5.667,0,11.021-2.208,15.563-6.75l109.792-124.875c3.708-4.219,3.5-10.604-0.479-14.583     C376.896,212.49,370.542,212.281,366.292,215.99z"
                        fill="#82859f"
                      />
                      <path
                        d="M256,85.333c-141.167,0-256,114.844-256,256c0,26.479,4.104,52.688,12.167,77.917c1.417,4.417,5.521,7.417,10.167,7.417     h467.333c4.646,0,8.75-3,10.167-7.417C507.896,394.021,512,367.813,512,341.333C512,200.177,397.167,85.333,256,85.333z      M458.667,352h31.26c-0.824,18.04-3.237,35.947-8.177,53.333H30.25c-4.94-17.387-7.353-35.293-8.177-53.333h31.26     C59.229,352,64,347.229,64,341.333c0-5.896-4.771-10.667-10.667-10.667h-31.46c1.581-34.919,10.68-67.865,25.948-97.208     l27.324,15.781c1.688,0.969,3.521,1.427,5.333,1.427c3.667,0,7.271-1.906,9.229-5.333c2.958-5.104,1.208-11.625-3.896-14.573     l-27.263-15.746c18.323-28.539,42.602-52.816,71.142-71.138l15.746,27.28c1.958,3.417,5.563,5.333,9.229,5.333     c1.813,0,3.646-0.458,5.333-1.427c5.104-2.948,6.854-9.469,3.896-14.573l-15.777-27.332c29.345-15.27,62.293-24.37,97.215-25.951     v31.46c0,5.896,4.771,10.667,10.667,10.667s10.667-4.771,10.667-10.667v-31.46c34.922,1.581,67.87,10.681,97.215,25.951     l-15.777,27.332c-2.958,5.104-1.208,11.625,3.896,14.573c1.688,0.969,3.521,1.427,5.333,1.427c3.667,0,7.271-1.917,9.229-5.333     l15.746-27.28c28.54,18.322,52.819,42.599,71.142,71.138l-27.263,15.746c-5.104,2.948-6.854,9.469-3.896,14.573     c1.958,3.427,5.563,5.333,9.229,5.333c1.812,0,3.646-0.458,5.333-1.427l27.324-15.781c15.268,29.344,24.367,62.289,25.948,97.208     h-31.46c-5.896,0-10.667,4.771-10.667,10.667C448,347.229,452.771,352,458.667,352z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>پیشخوان</span>
            </MenuItem>
          </MenuItems>
          <MenuItems>
            <MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" width="22px" height="22px">
                <g>
                  <g>
                    <g>
                      <path
                        d="M469.333,0H42.667C19.146,0,0,19.135,0,42.667v128c0,23.531,19.146,42.667,42.667,42.667H78.75l7.708,15.438     c3.625,7.229,15.458,7.229,19.083,0l7.708-15.438h121.417l12.792,17.063c4.042,5.375,13.042,5.375,17.083,0l12.792-17.063H398.75     l7.708,15.438c1.813,3.615,5.5,5.896,9.542,5.896c4.042,0,7.729-2.281,9.542-5.896l7.708-15.438h36.083     c23.521,0,42.667-19.135,42.667-42.667v-128C512,19.135,492.854,0,469.333,0z M490.667,170.667     c0,11.76-9.563,21.333-21.333,21.333h-42.667c-4.042,0-7.729,2.281-9.542,5.896l-1.125,2.25l-1.125-2.25     c-1.813-3.615-5.5-5.896-9.542-5.896H272c-3.354,0-6.521,1.583-8.542,4.271L256,206.219l-7.458-9.948     C246.521,193.583,243.354,192,240,192H106.667c-4.042,0-7.729,2.281-9.542,5.896L96,200.146l-1.125-2.25     c-1.813-3.615-5.5-5.896-9.542-5.896H42.667c-11.771,0-21.333-9.573-21.333-21.333v-128c0-11.76,9.563-21.333,21.333-21.333     h426.667c11.771,0,21.333,9.573,21.333,21.333V170.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M309.333,341.333C309.333,311.927,285.417,288,256,288s-53.333,23.927-53.333,53.333     c0,29.406,23.917,53.333,53.333,53.333S309.333,370.74,309.333,341.333z M224,341.333c0-17.646,14.354-32,32-32s32,14.354,32,32     c0,17.646-14.354,32-32,32S224,358.979,224,341.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M469.333,309.333C469.333,279.927,445.417,256,416,256c-29.417,0-53.333,23.927-53.333,53.333     s23.917,53.333,53.333,53.333C445.417,362.667,469.333,338.74,469.333,309.333z M384,309.333c0-17.646,14.354-32,32-32     c17.646,0,32,14.354,32,32c0,17.646-14.354,32-32,32C398.354,341.333,384,326.979,384,309.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M149.333,309.333C149.333,279.927,125.417,256,96,256s-53.333,23.927-53.333,53.333S66.583,362.667,96,362.667     S149.333,338.74,149.333,309.333z M64,309.333c0-17.646,14.354-32,32-32s32,14.354,32,32c0,17.646-14.354,32-32,32     S64,326.979,64,309.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M416,64H96c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h320     c5.896,0,10.667-4.771,10.667-10.667C426.667,68.771,421.896,64,416,64z"
                        fill="#82859f"
                      />
                      <path
                        d="M352,128H96c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h256     c5.896,0,10.667-4.771,10.667-10.667C362.667,132.771,357.896,128,352,128z"
                        fill="#82859f"
                      />
                      <path
                        d="M488.958,395.344c-17.042-10.042-43.542-22.01-72.958-22.01c-29.417,0-55.917,11.969-72.958,22.01     c-12.117,7.151-19.944,20.155-22.098,34.849C303.145,422.668,280.467,416,256,416s-47.143,6.667-64.943,14.191     c-2.154-14.694-9.982-27.697-22.099-34.848c-17.042-10.042-43.542-22.01-72.958-22.01s-55.917,11.969-72.958,22.01     C8.833,403.729,0,420.01,0,437.833v6.833c0,13.604,10.25,24.667,22.854,24.667h128c-0.855,3.626-1.521,7.327-1.521,11.167v6.833     c0,13.604,10.938,24.667,24.375,24.667h164.583c13.438,0,24.375-11.063,24.375-24.667V480.5c0-3.84-0.665-7.54-1.521-11.167h128     c12.604,0,22.854-11.063,22.854-24.667v-6.833C512,420.01,503.167,403.729,488.958,395.344z M162.253,448H22.854     c-0.25,0-1.521-1.115-1.521-3.333v-6.833c0-10.156,4.917-19.615,12.542-24.115c14.75-8.688,37.5-19.052,62.125-19.052     s47.375,10.365,62.125,19.052c7.625,4.5,12.542,13.958,12.542,24.115l0.056,3.013C167.604,442.954,164.751,445.279,162.253,448z      M341.333,487.333c0,1.833-1.354,3.333-3.042,3.333H173.708c-1.688,0-3.042-1.5-3.042-3.333V480.5     c0-10.094,5.479-19.229,14.313-23.854c16.813-8.813,42.771-19.313,71.021-19.313s54.208,10.5,71.021,19.313     c8.833,4.625,14.313,13.76,14.313,23.854V487.333z M490.667,444.667c0,2.219-1.271,3.333-1.521,3.333H349.747     c-2.483-2.704-5.319-5.014-8.414-7.113v-3.053c0-10.156,4.917-19.615,12.542-24.115c14.75-8.688,37.5-19.052,62.125-19.052     s47.375,10.365,62.125,19.052c7.625,4.5,12.542,13.958,12.542,24.115V444.667z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>لیست کاربران</span>
            </MenuItem>
          </MenuItems>
          <MenuItems>
            <MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" width="22px" height="22px">
                <g>
                  <g>
                    <g>
                      <circle cx="53.333" cy="74.667" r="10.667" fill="#82859f" />
                      <circle cx="96" cy="74.667" r="10.667" fill="#82859f" />
                      <circle cx="138.667" cy="74.667" r="10.667" fill="#82859f" />
                      <path
                        d="M117.333,234.667H352c5.896,0,10.667-4.771,10.667-10.667s-4.771-10.667-10.667-10.667H117.333     c-5.896,0-10.667,4.771-10.667,10.667S111.438,234.667,117.333,234.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M245.333,341.333h-128c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h128     c5.896,0,10.667-4.771,10.667-10.667C256,346.104,251.229,341.333,245.333,341.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M471.167,149.333c-0.618,0-1.217,0.155-1.833,0.184V64c0-23.531-19.146-42.667-42.667-42.667h-384     C19.146,21.333,0,40.469,0,64v384c0,23.531,19.146,42.667,42.667,42.667h384c23.521,0,42.667-19.135,42.667-42.667V249.745     l30.708-30.703c0,0,0,0,0-0.01c7.604-7.604,11.958-18.125,11.958-28.865C512,167.646,493.688,149.333,471.167,149.333z      M21.333,64c0-11.76,9.563-21.333,21.333-21.333h384C438.438,42.667,448,52.24,448,64v42.667H21.333V64z M448,448     c0,11.76-9.563,21.333-21.333,21.333h-384c-11.771,0-21.333-9.573-21.333-21.333V128H448v28.62     c-2.025,1.392-3.962,2.923-5.708,4.672l-116.06,116.042H117.333c-5.896,0-10.667,4.771-10.667,10.667s4.771,10.667,10.667,10.667     h191.785l-10.243,51.24c-0.708,3.5,0.396,7.115,2.917,9.635c2.021,2.021,4.75,3.125,7.542,3.125c0.688,0,1.396-0.073,2.083-0.208     l53.313-10.667c2.083-0.417,3.979-1.427,5.458-2.917L448,271.076V448z M357.396,331.51l-34.458,6.896l6.896-34.5l96.828-96.828     l27.587,27.587L357.396,331.51z M484.958,203.958l-15.625,15.625l-27.589-27.589l15.63-15.63     c3.625-3.615,8.646-5.698,13.792-5.698c10.75,0,19.5,8.75,19.5,19.5C490.667,195.292,488.583,200.323,484.958,203.958z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>لیست پست ها</span>
            </MenuItem>
          </MenuItems>
          <MenuItems>
            <MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" width="22px" height="22px">
                <g>
                  <g>
                    <g>
                      <path
                        d="M405.323,338.094c-0.379-89.583-16.939-155.204-84.244-178.926c2.875-12.021,11.156-30.996,18.723-48.22     c11.76-26.802,22.865-52.115,22.865-68.281C362.667,22.979,351.49,0,320,0c-23.417,0-28.813,12.719-31.698,19.552     c-0.281,0.656-0.625,1.469-0.615,1.771c-1.156-0.042-1.875-0.521-5.385-4.5C276.375,10.125,267.427,0,245.333,0     c-28.625,0-44.104,28.438-50.031,42.552c-10.104,0.271-26.958,2.25-37.177,11.75c-5.75,5.344-8.792,12.385-8.792,20.365     c0,14.135,10.76,31.323,22.156,49.521c7.586,12.115,15.73,25.342,18.872,35.188c-66.831,23.888-83.307,89.387-83.685,178.719     C98.125,351.125,64,405.802,64,448c0,55.688,120.292,64,192,64s192-8.313,192-64C448,405.802,413.875,351.125,405.323,338.094z      M189.573,112.865c-8.427-13.448-18.906-30.198-18.906-38.198c0-2.052,0.573-3.427,1.969-4.729     c6.031-5.615,22.365-6.458,29.271-5.969c5.167,0.542,9.521-2.781,10.969-7.531c0.104-0.354,11.354-35.104,32.458-35.104     c12.479,0,16.229,4.24,20.979,9.615c4.375,4.948,10.354,11.719,21.688,11.719c13.677,0,17.906-9.99,19.938-14.792     c2.021-4.76,2.771-6.542,12.063-6.542c17.635,0,21.333,11.604,21.333,21.333c0,11.688-11.198,37.198-21.073,59.708     c-8.628,19.661-16.344,37.299-19.762,51.1c-13.23-2.658-27.914-4.142-44.499-4.142c-16.794,0-31.624,1.534-44.98,4.257     C207.139,140.993,198.566,127.23,189.573,112.865z M256,490.667c-100.49,0-170.667-17.542-170.667-42.667     c0-40.583,40.396-100.042,40.802-100.635c1.208-1.781,1.865-3.885,1.865-6.031c0-126.01,33.5-170.667,128-170.667     s128,44.656,128,170.667c0,2.156,0.656,4.26,1.865,6.031c0.417,0.594,40.802,59.969,40.802,100.635     C426.667,473.125,356.49,490.667,256,490.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M256,298.667h21.333c5.896,0,10.667-4.771,10.667-10.667s-4.771-10.667-10.667-10.667h-10.667     c0-5.896-4.771-10.667-10.667-10.667s-10.667,4.771-10.667,10.667v1.965C232.944,283.716,224,295.445,224,309.333     c0,17.646,14.354,32,32,32c5.885,0,10.667,4.781,10.667,10.667c0,5.885-4.781,10.667-10.667,10.667h-21.333     c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h10.667c0,5.896,4.771,10.667,10.667,10.667     s10.667-4.771,10.667-10.667v-1.965C279.056,377.617,288,365.888,288,352c0-17.646-14.354-32-32-32     c-5.885,0-10.667-4.781-10.667-10.667C245.333,303.448,250.115,298.667,256,298.667z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>آیتم‌های فروشگاه</span>
            </MenuItem>
          </MenuItems>
          <MenuItems>
            <MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" width="22px" height="22px">
                <g>
                  <g>
                    <g>
                      <circle cx="330.667" cy="96" r="10.667" fill="#82859f" />
                      <circle cx="394.667" cy="96" r="10.667" fill="#82859f" />
                      <path
                        d="M410.208,129.281c-5.125-2.708-11.583-0.667-14.354,4.479c-0.333,0.635-8.667,15.573-33.188,15.573     c-24.333,0-32.729-14.719-33.188-15.563c-2.688-5.167-9-7.198-14.25-4.646c-5.271,2.635-7.396,9.042-4.771,14.313     c0.563,1.115,14.063,27.229,52.208,27.229c38.146,0,51.646-26.115,52.208-27.229     C417.479,138.229,415.375,131.958,410.208,129.281z"
                        fill="#82859f"
                      />
                      <path
                        d="M149.333,362.667C190.5,362.667,224,329.167,224,288s-33.5-74.667-74.667-74.667c-41.167,0-74.667,33.5-74.667,74.667     S108.167,362.667,149.333,362.667z M149.333,234.667c29.417,0,53.333,23.927,53.333,53.333s-23.917,53.333-53.333,53.333     C119.917,341.333,96,317.406,96,288S119.917,234.667,149.333,234.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M264,414.531C237.146,400.604,195.458,384,149.333,384s-87.813,16.604-114.667,30.531     C13.292,425.615,0,447.469,0,471.573v9.76C0,498.24,13.667,512,30.479,512h237.708c16.813,0,30.479-13.76,30.479-30.667v-9.76     C298.667,447.469,285.375,425.615,264,414.531z M277.333,481.333c0,5.146-4.104,9.333-9.146,9.333H30.479     c-5.042,0-9.146-4.188-9.146-9.333v-9.76c0-16.104,8.875-30.698,23.167-38.104c24.729-12.833,63.021-28.135,104.833-28.135     s80.104,15.302,104.833,28.135c14.292,7.406,23.167,22,23.167,38.104V481.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M362.667,0c-82.333,0-149.333,52.635-149.333,117.333c0,25.958,10.875,50.938,30.875,71.375l-27.75,27.75     c-3.042,3.052-3.958,7.635-2.313,11.625c1.646,3.99,5.542,6.583,9.854,6.583h138.667C445,234.667,512,182.031,512,117.333     S445,0,362.667,0z M362.667,213.333H249.75L267.083,196c2.104-2.104,3.229-4.979,3.125-7.948     c-0.125-2.969-1.479-5.76-3.729-7.688c-20.521-17.594-31.813-39.979-31.813-63.031c0-52.938,57.417-96,128-96s128,43.063,128,96     S433.25,213.333,362.667,213.333z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
                <g />
              </svg>
              <span>پشتیبانی</span>
            </MenuItem>
          </MenuItems>
          <MenuItems>
            <MenuItem>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" width="22px" height="22px">
                <g>
                  <g>
                    <g>
                      <path
                        d="M444.875,109.792L338.208,3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.146,0,64,19.135,64,42.667v426.667     C64,492.865,83.146,512,106.667,512h298.667C428.854,512,448,492.865,448,469.333v-352     C448,114.5,446.875,111.792,444.875,109.792z M341.333,36.417l70.25,70.25h-48.917c-11.771,0-21.333-9.573-21.333-21.333V36.417z      M426.667,469.333c0,11.76-9.563,21.333-21.333,21.333H106.667c-11.771,0-21.333-9.573-21.333-21.333V42.667     c0-11.76,9.563-21.333,21.333-21.333H320v64C320,108.865,339.146,128,362.667,128h64V469.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M373.333,298.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667     c5.896,0,10.667-4.771,10.667-10.667C384,303.438,379.229,298.667,373.333,298.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M373.333,234.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667     c5.896,0,10.667-4.771,10.667-10.667C384,239.438,379.229,234.667,373.333,234.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M373.333,362.667H138.667c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h234.667     c5.896,0,10.667-4.771,10.667-10.667C384,367.438,379.229,362.667,373.333,362.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M266.667,426.667h-128c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h128     c5.896,0,10.667-4.771,10.667-10.667C277.333,431.438,272.563,426.667,266.667,426.667z"
                        fill="#82859f"
                      />
                      <path
                        d="M234.667,181.333c0,5.896,4.771,10.667,10.667,10.667h128c5.896,0,10.667-4.771,10.667-10.667     c0-5.896-4.771-10.667-10.667-10.667h-128C239.438,170.667,234.667,175.438,234.667,181.333z"
                        fill="#82859f"
                      />
                      <path
                        d="M160,170.667h-21.333c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h10.667     c0,5.896,4.771,10.667,10.667,10.667s10.667-4.771,10.667-10.667v-1.965C183.056,185.617,192,173.888,192,160     c0-17.646-14.354-32-32-32c-5.875,0-10.667-4.781-10.667-10.667c0-5.885,4.792-10.667,10.667-10.667h21.333     c5.896,0,10.667-4.771,10.667-10.667s-4.771-10.667-10.667-10.667h-10.667c0-5.896-4.771-10.667-10.667-10.667     s-10.667,4.771-10.667,10.667v1.965C136.944,91.716,128,103.445,128,117.333c0,17.646,14.354,32,32,32     c5.875,0,10.667,4.781,10.667,10.667S165.875,170.667,160,170.667z"
                        fill="#82859f"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <span>لیست تراکنش‌ها</span>
            </MenuItem>
          </MenuItems>
        </MenuItemsContainer>
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

const WrappedForm = withRouter(Menu);

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

const MenuItemsContainer = styled.ul`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MenuItems = styled.li`
  display: block;
  margin: 15px 0;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 20px;
  padding: 10px 15px;
  font-family: "SAMIMBOLD";
  font-size: 14px;
  border-radius: 6px;
  color: ${props => (props.active ? "#fff" : "#82859F")};
  &:hover {
    color: #fff;
  }
  & svg {
    margin-left: 10px;
  }
  & svg path {
    fill: ${props => (props.active ? "#fff" : "#82859f")};
  }
  &:hover svg path {
    fill: #fff;
  }
`;

const UserContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-top: 1px solid rgb(49, 49, 49);
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
