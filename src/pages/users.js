import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Table, SearchInput, Select } from "zent";

import { getUsers } from "../actions/userActions";

class UsersList extends Component {
  constructor(props) {
    super(props);
    // moment.loadPersian({ dialect: "persian-modern" });
    this.state = {
      pageSize: 10,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.users.items,
      searchText: "",
      filters: [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }]
    };
  }

  static propTypes = {
    users: PropTypes.shape({
      items: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getUsers(this.props.users.size, this.props.users.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.items !== this.props.users.items)
      this.setState({
        page: {
          current: this.props.users.page,
          totalItem: this.props.users.size
        },
        datasets: this.props.users.items
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
        totalItem: this.props.users.size
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
    this.props.users.findUser(this.state.searchText);
  };

  showOption = (e, data) => {
    this.props.users.filterUser();
  };

  render() {
    const columns = [
      {
        title: "شناسه",
        width: "10%",
        name: "id"
      },
      {
        title: "ایمیل",
        width: "40%",
        name: "email"
      },
      {
        title: "شماره موبایل",
        width: "40%",
        name: "phoneNumber"
      }
    ];
    const { datasets, page, searchText, filters } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست کاربران</h2>
          </Col>
          <Col>
            <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} />
            <Select placeholder="فیلتر بر اساس" optionValue="id" optionText="name" data={filters} onChange={this.showOption} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ کاربری در این فهرست وجود ندارد."}
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
  users: state.users
});

export default connect(
  mapStateToProps,
  {
    getUsers
  }
)(UsersList);
