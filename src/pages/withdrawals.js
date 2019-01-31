import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalali";
import { Table, SearchInput } from "zent";

import { getWithdrawal, clearState } from "../actions/transactionActions";

class WithdrawList extends Component {
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
      accounts: []
    };
  }

  static propTypes = {
    transactions: PropTypes.shape({
      items: PropTypes.array.isRequired,
      accounts: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getWithdrawal(this.props.transactions.size, this.props.transactions.page, this.props.transactions.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.transactions.items !== this.props.transactions.items)
      this.setState({
        page: {
          current: this.props.transactions.page,
          totalItem: this.props.transactions.size
        },
        datasets: this.props.transactions.items,
        accounts: this.props.transactions.accounts
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
    this.props.getWithdrawal(this.props.transactions.size, this.props.transactions.page, this.state.searchText);
  };

  findBankAccountHolder = id => {
    let result = this.state.accounts.find(item => item.id === id);
    if (typeof result !== "undefined") return `${result.holderFirstName} ${result.holderLastName}`;
  };

  findBankAccountNumber = id => {
    let result = this.state.accounts.find(item => item.id === id);
    if (typeof result !== "undefined") return result.accountNumber;
  };

  findBankCardNumber = id => {
    let result = this.state.accounts.find(item => item.id === id);
    if (typeof result !== "undefined") return result.cardNumber;
  };

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const columns = [
      {
        title: "شناسه",
        name: "id",
        width: "10%"
      },
      {
        title: "صاحب حساب",
        width: "20%",
        bodyRender: data => {
          return this.findBankAccountHolder(data.bankAccountId);
        }
      },
      {
        title: "شماره حساب",
        width: "20%",
        bodyRender: data => {
          return this.findBankAccountNumber(data.bankAccountId);
        }
      },
      {
        title: "شماره کارت",
        width: "20%",
        bodyRender: data => {
          return <div style={{ direction: "ltr" }}>{this.findBankCardNumber(data.bankAccountId)}</div>;
        }
      },
      {
        title: "مبلغ",
        width: "10%",
        bodyRender: data => {
          return <div>{parseFloat(data.amount).toLocaleString("fa")} تومان</div>;
        }
      },
      {
        title: "تاریـخ",
        width: "15%",
        bodyRender: data => {
          return moment(data.requestDateTime)
            .local()
            .format("jDD jMMMM jYYYY - HH:mm");
        }
      },
      {
        title: "وضعیت",
        width: "10%",
        name: "statusId",
        bodyRender: data => {
          switch (Number(data.statusId)) {
            case 1:
              return "در حال بررسی";
            case 2:
              return "واریز شده";
            case 3:
              return "رد شده";
            default:
              return "";
          }
        }
      }
    ];
    const { datasets, page, searchText } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">درخواست‌های برداشت</h2>
          </Col>
          <Col>
            <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ سابقه‌ای در این لیست وجود ندارد."}
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
    getWithdrawal,
    clearState
  }
)(WithdrawList);
