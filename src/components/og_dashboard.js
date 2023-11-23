import React, { Component } from 'react';
import axios from 'axios';
import { Button, Badge, Modal, Table } from 'react-bootstrap';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      message: '',
      id: '',
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getTicket = () => {
    return axios
      .get('http://localhost:5000/tickets/getTicketAll')
      .then((response) => {
        this.setState({
          data: response.data,
        });

        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  editSearchTerm = (e) => {
    if (e.target.value) {
      this.setState({ search: e.target.value });

      const newData = this.state.data.filter((item) => {
        const itemData = `${item.name.toUpperCase()} ${item.content.toUpperCase()} ${item.status}`;
        const textData = e.target.value.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
      });
    } else {
      this.setState({
        search: '',
      });
      this.getTicket();
    }
  };

  handleAddMessage = () => {
    const { id, message } = this.state;
    this.addMessage(id, message);
    this.setState({
      show: false,
    });
    this.getTicket();
  };

  handleShow = (id) => this.setState({ show: true, id: id });

  componentDidMount() {
    this.getTicket();
  }

  changeStatus = (id, status) => {
    return axios
      .put('tickets/changeStatus', {
        id,
        status,
      })
      .then((response) => {
        this.getTicket();
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  statusFilter = (status) => {
    return axios
      .post('tickets/filterStatus', {
        status,
      })
      .then((response) => {
        this.setState({
          data: response.data,
        });

        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addMessage = (id, messages) => {
    return axios
      .post('tickets/addMessages', {
        id,
        messages,
      })
      .then((response) => {
        this.setState({
          data: response.data,
        });

        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  statusName = (status) => {
    switch (status) {
      case 0:
        return <Badge pill variant="primary">Open</Badge>;
      case 1:
        return <Badge pill variant="danger">In Progress</Badge>;
      case 2:
        return <Badge pill variant="success">Closed</Badge>;
      default:
        return <Badge pill variant="primary">Open</Badge>;
    }
  };

  render() {
    return (
      <div className="container mt-4">
        {this.state.role === 1 ? (
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">ADMIN PAGE<br />TICKETS</h1>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Button variant="primary" className="mx-2 btn-sm" onClick={() => this.statusFilter(0)}>
                  Open
                </Button>
                <Button variant="danger" className="mx-2 btn-sm" onClick={() => this.statusFilter(1)}>
                  In Progress
                </Button>
                <Button variant="success" className="mx-2 btn-sm" onClick={() => this.statusFilter(2)}>
                  Closed
                </Button>
                <Button variant="dark" className="mx-2 btn-sm" onClick={() => this.getTicket()}>
                  ALL
                </Button>
              </div>
              <div>
                <input
                  style={{ width: "200px" }}
                  value={this.state.search}
                  placeholder="Search TicketName"
                  type="text"
                  onChange={this.editSearchTerm}
                  className="form-control"
                />
              </div>
            </div>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>TicketNumber</th>
                  <th>User name</th>
                  <th>Email</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Change Status</th>
                  <th>Add Message</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0 &&
                  this.state.data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ticketNumber}</td>
                      <td>{row.name}</td>
                      <td>{row.content}</td>
                      <td>
                        <a target="_parent" href={`http://localhost:5000/public/${row.img}`}>
                          <img width="100px" src={`http://localhost:5000/public/${row.img}`} alt="Ticket" />
                        </a>
                      </td>
                      <td>{this.statusName(row.status)}</td>
                      <td>
                        <Button variant="success" size="sm" onClick={() => this.changeStatus(row._id, 0)}>
                          Opening
                        </Button>{" "}
                        <Button variant="danger" size="sm" onClick={() => this.changeStatus(row._id, 1)}>
                          Waiting
                        </Button>{" "}
                        <Button variant="success" size="sm" onClick={() => this.changeStatus(row._id, 2)}>
                          Closed
                        </Button>{" "}
                      </td>
                      <td>
                        <Button name="addButton" size="sm" variant="primary" onClick={() => this.handleShow(row._id)}>
                          Add Message
                        </Button>

                        <Modal show={this.state.show} onHide={() => this.handleClose()}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add Message </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form>
                              <label>
                                Message :
                                <input type="text" name="message" value={this.state.message} onChange={this.handleChange} className="form-control" />
                              </label>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={() => this.handleAddMessage(this.state.id, this.state.message)}>
                              Add Message
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">User Tickets</h1>
            </div>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>TicketNumber</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0 &&
                  this.state.data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ticketNumber}</td>
                      <td>{row.message}</td>
                      <td>{this.statusName(row.status)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;