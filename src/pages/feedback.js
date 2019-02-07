import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Table, SearchInput, Select } from "zent";

import { getFeedbacks } from "../actions/feedbackActions";

class FeedbackList extends Component {
  constructor(props) {
    super(props);
    // moment.loadPersian({ dialect: "persian-modern" });
    this.state = {
      pageSize: 10,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.feedback.items,
      accounts: [],
      searchText: "",
      filters: [{ value: 1, text: "درخواست کمک یا سوال" }, { value: 2, text: "پیشنهاد یا انتقاد" }, { value: 3, text: "گزارش خطای سیستم" }, { value: 4, text: "سایر" }]
    };
  }

  static propTypes = {
    feedback: PropTypes.shape({
      items: PropTypes.array.isRequired,
      accounts: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      status: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getFeedbacks(this.props.feedback.size, this.props.feedback.page, this.props.feedback.status);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feedback.items !== this.props.feedback.items)
      this.setState({
        page: {
          current: this.props.feedback.page,
          totalItem: this.props.feedback.size
        },
        datasets: this.props.feedback.items,
        accounts: this.props.feedback.accounts
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
        totalItem: this.props.feedback.size
      }
    });
    this.props.onPageUpdate(conf.current);
  }

  onToolClick = data => {
    console.log(data);
  };

  onChange = evt => {
    this.setState({
      searchText: evt.target.searchText
    });
  };

  onPressEnter = () => {
    this.props.feedback.findUser(this.state.searchText);
  };

  showOption = (e, data) => {
    this.props.getFeedbacks(this.props.feedback.size, this.props.feedback.page, data.value);
  };

  getAccountNameById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? `${result.firstName} ${result.lastName !== null ? result.lastName : ""}` : "----";
  };

  render() {
    const columns = [
      {
        title: "شناسه",
        width: "10%",
        name: "id"
      },
      {
        title: "نام کاربر",
        width: "20%",
        bodyRender: data => {
          return <div>{this.getAccountNameById(data.accountId)}</div>;
        }
      },
      {
        title: "متن پیغام",
        width: "40%",
        name: "text"
      },
      {
        title: "نوع درخواست",
        width: "40%",
        bodyRender: data => {
          let result = this.state.filters.find(item => item.id === data.typeId);
          return result ? result.text : "----";
        }
      }
    ];
    const { datasets, page, searchText, filters } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست پیام‌ها</h2>
          </Col>
          <Col>
            {/* <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} /> */}
            <Select placeholder="فیلتر بر اساس" optionValue="value" optionText="text" data={filters} onChange={this.showOption} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ پیامی در این فهرست وجود ندارد."}
          columns={columns}
          datasets={datasets}
          onChange={this.onChange.bind(this)}
          getRowConf={this.getRowConf}
          pageInfo={page}
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

const Col = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const mapStateToProps = state => ({
  feedback: state.feedback
});

export default connect(
  mapStateToProps,
  {
    getFeedbacks
  }
)(FeedbackList);
