import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Table, SearchInput, Button, Notify, Portal, Icon } from "zent";

import axios from "../../utils/requestConfig";
import { getChannels } from "../../actions/channelActions";

const WrappedPortal = Portal.withNonScrollable(Portal.withESCToClose(Portal));

class ActiveChannel extends Component {
  state = {
    message: "",
    isLoading: false
  };

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    return axios
      .get(`/notes?EntityId=${this.props.selectedItem}&EntityId_op=in`)
      .then(res => {
        let result = res.data.data.pop();
        this.setState({ message: result.body });
      })
      .catch(err => {
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
      });
  };

  handleChange = e => this.setState({ message: e.target.value });

  submit = () => {
    if (this.state.message !== "") {
      this.setState({ isLoading: true });
      return axios
        .post("/channels/unbanned", {
          channelId: this.props.selectedItem,
          noteBody: this.state.message
        })
        .then(res => {
          this.setState({ isLoading: false });
          this.props.refreshData();
        })
        .catch(err => {
          this.setState({ isLoading: false });
          Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
        });
    }
  };

  render() {
    const { isLoading, message } = this.state;
    const { modalStatus, hideModal } = this.props;
    return (
      <WrappedPortal visible={modalStatus} onClickAway={hideModal} onClose={hideModal} className="layer" style={{ background: "rgba(0, 0, 0, 0.2)" }} useLayerForClickAway>
        <div className="custom-modal">
          <div className="modal-header">
            <span>تغییر وضعیت شبکه اجتماعی</span>
            <Icon type="close" onClick={hideModal} />
          </div>
          <div className="modal-body">
            <p>آیا مطمیین به فعال کردن این شبکه اجتماعی هستید؟</p>
            {/* <Input type="textarea" onChange={this.handleChange} maxLength={100} value={message} showCount autoSize /> */}
            <p>توضیحات: {message}</p>
          </div>
          <div className="modal-footer">
            <Button type="primary" onClick={this.submit} loading={isLoading}>
              تایید
            </Button>
          </div>
        </div>
      </WrappedPortal>
    );
  }
}

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
      modalStatus: false,
      selectedItem: null
    };
  }

  static propTypes = {
    channels: PropTypes.shape({
      items: PropTypes.array.isRequired,
      isLoading: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      accounts: PropTypes.array.isRequired,
      search: PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    this.props.getChannels(this.props.channels.size, this.props.channels.page, "2,3", this.props.channels.search);
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
      searchText: evt.target.value
    });
  };

  onPressEnter = () => {
    this.props.getChannels(this.props.channels.size, this.props.channels.page, "2,3", this.state.searchText);
  };

  getAccountNameById = id => {
    let result = this.state.accounts.find(item => item.accountId === id);
    return result ? `${result.firstName} ${result.lastName !== null ? result.lastName : ""}` : "----";
  };

  onHide = () => this.setState({ modalStatus: false });

  refreshData = () => {
    this.setState({ modalStatus: false });
    this.props.getChannels(this.props.channels.size, this.props.channels.page, "2,3", this.props.channels.search);
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
          return (
            <Button type="primary" className="table-btn" icon="check" onClick={() => this.setState({ modalStatus: true, selectedItem: data.id })}>
              فعال
            </Button>
          );
        }
      }
    ];
    const { datasets, page, searchText, modalStatus, selectedItem } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست کانال‌ها</h2>
          </Col>
          <Col>
            <SearchInput value={searchText} placeholder="جستجو" onChange={this.onChange} onPressEnter={this.onPressEnter} />
          </Col>
        </SearchConatainer>
        <Table
          emptyLabel={"هیچ کانالی در این فهرست وجود ندارد."}
          columns={columns}
          datasets={datasets}
          onChange={this.onChange.bind(this)}
          getRowConf={this.getRowConf}
          pageInfo={page}
          className={"channels-table"}
          rowKey="id"
        />
        {modalStatus && <ActiveChannel modalStatus={modalStatus} hideModal={this.onHide} selectedItem={selectedItem} refreshData={this.refreshData} />}
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
