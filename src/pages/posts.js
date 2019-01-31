import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalali";
import { Table, Select, Pop } from "zent";

import { getPosts } from "../actions/postActions";

const Option = Select.Option;

class PostsList extends Component {
  constructor(props) {
    super(props);
    moment.loadPersian({ dialect: "persian-modern" });
    this.userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
    this.state = {
      pageSize: 10,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.posts.items,
      channels: [],
      accounts: [],
      status: ""
    };
  }

  static propTypes = {
    posts: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      items: PropTypes.array.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      channels: PropTypes.array.isRequired,
      accounts: PropTypes.array.isRequired
    })
  };

  componentDidMount() {
    this.props.getPosts(this.props.posts.size, this.props.posts.page, this.props.posts.status);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts.items !== this.props.posts.items)
      this.setState({
        page: {
          current: this.props.posts.page,
          totalItem: this.props.posts.size
        },
        datasets: this.props.posts.items,
        channels: this.props.posts.channels,
        accounts: this.props.posts.accounts
      });
  }

  getRowConf(data, index) {
    return {
      canSelect: false
    };
  }

  onChange(conf) {
    this.setState({
      page: {
        pageSize: 10,
        current: conf.current,
        totalItem: this.props.posts.size
      }
    });
    this.props.onPageUpdate(conf.current);
  }

  onToolClick = data => {
    console.log(data);
  };

  selectChangeHandler = (e, data) => {
    this.setState({ status: data.value });
    this.props.getPosts(this.props.posts.size, this.props.posts.page, data.value);
  };

  getChannelNameById = id => {
    let result = this.state.channels.find(item => item.id === id);
    return result && result.name !== null ? result.name.substring(20, 0) : "----";
  };

  getChannelTypeById = id => {
    let result = this.state.channels.find(item => item.id === id);
    return result ? result.typeId : null;
  };

  checkPostStatus = data => {
    if (data.stateId === "1" && data.scheduleTypeId === "2") {
      return (
        <Pop trigger="hover" content="زمان بندی شده">
          <span className="status-icon calendar" />
        </Pop>
      );
    } else if (data.stateId === "1" && data.scheduleTypeId === "3") {
      return (
        <Pop trigger="hover" content="پیش نویس شده">
          <span className="status-icon draft" />
        </Pop>
      );
    } else if (data.stateId === "2" || data.stateId === "1") {
      return (
        <Pop trigger="hover" content="در حال ارسال">
          <span className="status-icon waiting" />
        </Pop>
      );
    } else if (data.stateId === "3") {
      return (
        <Pop trigger="hover" content="ارسال شده">
          <span className="status-icon send" />
        </Pop>
      );
    } else if (data.stateId === "5") {
      return (
        <Pop trigger="hover" content="ارسال ناموفق">
          <span className="status-icon not-send" />
        </Pop>
      );
    } else if (data.stateId === "6" || data.stateId === "7") {
      return (
        <Pop trigger="hover" content="در حال حذف">
          <span className="status-icon waiting" />
        </Pop>
      );
    } else if (data.stateId === "8") {
      return (
        <Pop trigger="hover" content="پست حذف شده از شبکه اجتماعی">
          <span className="status-icon not-send" />
        </Pop>
      );
    } else if (data.stateId === "9") {
      return (
        <Pop trigger="hover" content="حذف ناموفق از کانال یا شبکه اجتماعی">
          <span className="status-icon not-send" />
        </Pop>
      );
    }
  };

  getAccountNameById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? `${result.firstName} ${result.lastName !== null ? result.lastName : ""}` : "----";
  };

  render() {
    const columns = [
      {
        title: "وضعیت",
        width: "10%",
        bodyRender: data => {
          return this.checkPostStatus(data);
        }
      },
      {
        title: "نام کاربر",
        width: "18%",
        bodyRender: data => {
          return <div>{this.getAccountNameById(data.accountId)}</div>;
        }
      },
      {
        title: "شنـاسه",
        width: "10%",
        name: "id"
      },
      {
        title: "کانـال",
        width: "15%",
        bodyRender: data => {
          return data.channelId !== null && this.getChannelTypeById(data.channelId) !== null ? (
            <div className="channle-name">
              <div data-type={this.getChannelTypeById(data.channelId)} className="channel-type" />
              <span>{this.getChannelNameById(data.channelId)}</span>
            </div>
          ) : (
            "----"
          );
        }
      },
      {
        title: "پست",
        width: "17%",
        bodyRender: data => {
          return data.bodyExcerpt !== "" ? (
            <div className="post-content" onClick={e => e.preventDefault()} dangerouslySetInnerHTML={{ __html: data.bodyExcerpt }} />
          ) : (
            <div className="post-content">پست بدون محتوا است</div>
          );
        }
      },
      {
        title: "تاریخ ارسال",
        width: "15%",
        name: "creationDate",
        bodyRender: data => {
          return data.sendDate !== null
            ? moment(data.sendDate)
                .local()
                .format("jDD jMMMM jYYYY - HH:mm")
            : "----";
        }
      },
      {
        title: "ابزار",
        width: "15%"
      }
    ];
    const { datasets, page, status } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست پست‌ها</h2>
          </Col>
          <Col>
            <Select autoWidth value={status} placeholder="نمایش همه پست‌ها" onChange={this.selectChangeHandler}>
              <Option value="0">همه پست‌ها</Option>
              <Option value="2">زمان بندی شده</Option>
              <Option value="1">ارسال شده</Option>
              <Option value="3">پیش نویس شده</Option>
            </Select>
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ پستی در این لیست وجود ندارد."}
          columns={columns}
          datasets={datasets}
          onChange={this.onChange.bind(this)}
          getRowConf={this.getRowConf}
          pageInfo={page}
          className={"posts-table"}
          rowKey="id"
        />
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

const Col = styled.div``;

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  {
    getPosts
  }
)(PostsList);
