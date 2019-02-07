import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalali";
import { Table, SearchInput } from "zent";

import { getUserBalances, clearState } from "../actions/transactionActions";

class TransactionList extends Component {
  constructor(props) {
    super(props);
    moment.loadPersian({ dialect: "persian-modern" });
    this.state = {
      pageSize: 10,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.transactions.items,
      searchText: "",
      accounts: [],
      profiles: []
    };
  }

  static propTypes = {
    transactions: PropTypes.shape({
      items: PropTypes.array.isRequired,
      accounts: PropTypes.array.isRequired,
      profiles: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getUserBalances(this.props.transactions.size, this.props.transactions.page, this.props.transactions.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.transactions.items !== this.props.transactions.items)
      this.setState({
        page: {
          current: this.props.transactions.page,
          totalItem: this.props.transactions.size
        },
        datasets: this.props.transactions.items,
        accounts: this.props.transactions.accounts,
        profiles: this.props.transactions.profiles
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
        totalItem: this.props.transactions.size
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
    this.props.getTransaction(this.props.transactions.size, this.props.transactions.page, this.state.searchText);
  };

  actionType = amount => {
    return amount < 0 ? "minus" : "plus";
  };

  getAccountNameById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? `${result.firstName} ${result.lastName !== null ? result.lastName : ""}` : "----";
  };

  getAccountEmailById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? result.email : "----";
  };

  getAccountPhoneNumberById = id => {
    let result = this.state.profiles.find(item => item.id === id);
    return result ? result.phoneNumber : "----";
  };

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const columns = [
      {
        title: "شماره کاربری",
        width: "10%",
        name: "accountId"
      },
      {
        title: "نام کاربر",
        width: "20%",
        bodyRender: data => {
          return <div>{this.getAccountNameById(data.accountId)}</div>;
        }
      },
      {
        title: "ایمیل",
        width: "25%",
        bodyRender: data => {
          return <div>{this.getAccountEmailById(data.accountId)}</div>;
        }
      },
      {
        title: "شماره تماس",
        width: "15%",
        bodyRender: data => {
          return <div>{this.getAccountPhoneNumberById(data.accountId)}</div>;
        }
      },
      {
        title: "موجودی",
        width: "20%",
        bodyRender: data => {
          return <React.Fragment>{parseFloat(data.balance).toLocaleString("fa")} تومان</React.Fragment>;
        }
      },
      {
        title: "قابل برداشت",
        width: "20%",
        bodyRender: data => {
          return <React.Fragment>{parseFloat(data.takableBalance).toLocaleString("fa")} تومان</React.Fragment>;
        }
      },
      {
        title: "عملیات",
        width: "20%",
        bodyRender: data => {
          return "";
        }
      }
    ];
    const { datasets, page, searchText } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست سابقه مالی‌ها</h2>
          </Col>
          <Col>
            <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ سابقه‌ی مالی در این فهرست وجود ندارد."}
          columns={columns}
          datasets={datasets}
          onChange={this.onChange.bind(this)}
          getRowConf={this.getRowConf}
          pageInfo={page}
          className={"transactions-table"}
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
  transactions: state.transactions
});

export default connect(
  mapStateToProps,
  {
    getUserBalances,
    clearState
  }
)(TransactionList);
