import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Table, SearchInput, Select } from "zent";

import { getChannels } from "../actions/channelActions";

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.channels.items,
      searchText: "",
      accounts: [],
      filters: [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]
    };
  }

  static propTypes = {
    channels: PropTypes.shape({
      items: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      accounts: PropTypes.array.isRequired
    })
  };

  componentDidMount() {
    this.props.getChannels(this.props.channels.size, this.props.channels.page, "");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.channels.items !== this.props.channels.items)
      this.setState({
        page: {
          current: this.props.channels.page,
          totalItem: this.props.channels.size
        },
        datasets: this.props.channels.items,
        accounts: this.props.channels.accounts
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
        totalItem: this.props.channels.size
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
    this.props.channels.findUser(this.state.searchText);
  };

  showOption = (e, data) => {
    this.props.channels.filterUser();
  };

  getAccountNameById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? `${result.firstName} ${result.lastName !== null ? result.lastName : ""}` : "----";
  };

  render() {
    const columns = [
      {
        title: "شناسه",
        width: "18%",
        name: "id"
      },
      {
        title: "نام شبکه",
        width: "18%",
        name: "name"
      },
      {
        title: "نوع شبکه",
        width: "18%",
        bodyRender: data => {
          return <div className="channel-type" data-type={data.typeId} />;
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
        title: "وضعیت",
        width: "18%",
        bodyRender: data => {
          return "";
        }
      }
    ];
    const { datasets, page, searchText, filters } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">لیست کانال‌ها</h2>
          </Col>
          <Col>
            <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} />
            <Select placeholder="فیلتر بر اساس" optionValue="id" optionText="name" data={filters} onChange={this.showOption} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ کانالی در این لیست وجود ندارد."}
          columns={columns}
          datasets={datasets}
          onChange={this.onChange.bind(this)}
          getRowConf={this.getRowConf}
          pageInfo={page}
          className={"channels-table"}
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
  channels: state.channels
});

export default connect(
  mapStateToProps,
  {
    getChannels
  }
)(ChannelList);
