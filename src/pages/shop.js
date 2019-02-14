import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Table, Select, Button, Portal, Icon, Input, Notify } from "zent";
import axios from "../utils/requestConfig";

import { getFeedbacks } from "../actions/feedbackActions";

const WrappedPortal = Portal.withNonScrollable(Portal.withESCToClose(Portal));

// class SendMessage extends Component {
//   state = {
//     message: "",
//     isLoading: false
//   };

//   handleChange = e => this.setState({ message: e.target.value });

//   submit = () => {
//     if (this.state.message !== "") {
//       this.setState({ isLoading: true });
//       return axios
//         .post("/feedback/send", {})
//         .then(res => {
//           this.setState({ isLoading: false });
//           Notify.success("پاسخ با موفقیت ارسال گردید.", 5000);
//           this.props.hideModal();
//         })
//         .catch(err => {
//           this.setState({ isLoading: false });
//           Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "در برقراری ارتباط مشکلی به وجود آمده است.", 5000);
//         });
//     }
//   };

//   render() {
//     const { isLoading } = this.state;
//     const { modalStatus, hideModal } = this.props;
//     return (
//       <WrappedPortal visible={modalStatus} onClickAway={hideModal} onClose={hideModal} className="layer" style={{ background: "rgba(0, 0, 0, 0.2)" }} useLayerForClickAway>
//         <div className="custom-modal">
//           <div className="modal-header">
//             <span>ارسال پاسخ به کاربر</span>
//             <Icon type="close" onClick={hideModal} />
//           </div>
//           <div className="modal-body">
//             <label>متن پبام</label>
//             <Input type="textarea" onChange={this.handleChange} maxLength={100} showCount autoSize />
//           </div>
//           <div className="modal-footer">
//             <Button type="primary" onClick={this.submit} loading={isLoading}>
//               ارسال
//             </Button>
//           </div>
//         </div>
//       </WrappedPortal>
//     );
//   }
// }

class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      page: {
        current: 0,
        totalItem: 0
      },
      datasets: this.props.feedback.items,
      modalStatus: false,
      selectedItem: null
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

  hideModal = () => this.setState({ modalStatus: false });

  render() {
    const columns = [
      {
        title: "شناسه",
        name: "id"
      },
      {
        title: "نام کاربر",
        bodyRender: data => {
          return <div>{this.getAccountNameById(data.accountId)}</div>;
        }
      },
      {
        title: "متن پیغام",
        width: "35%",
        name: "text"
      },
      {
        title: "نوع درخواست",
        bodyRender: data => {
          console.log(data.typeId);
          let result = this.state.filters.find(item => item.value === Number(data.typeId));
          return result ? result.text : "----";
        }
      },
      {
        title: "",
        bodyRender: data => {
          return (
            <Button type="primary" className="table-btn" icon="im-o" onClick={() => this.setState({ modalStatus: true, selectedItem: data.id })}>
              ارسال پاسخ
            </Button>
          );
        }
      }
    ];
    const { datasets, page, filters, modalStatus } = this.state;
    return (
      <Container>
        <SearchConatainer>
          <Col>
            <h2 className="page-title">فهرست پیام‌ها</h2>
          </Col>
          <Col>
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
        <SendMessage modalStatus={modalStatus} hideModal={this.hideModal} />
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
