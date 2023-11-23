import React, { Component } from 'react';
import axios from 'axios';
import { Button, Badge, Modal, Table, Dropdown } from 'react-bootstrap';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      message: '',
      id: '',
      search: '',
      role: 1,
      messages: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    ticketToDelete: null,
  };

  getTicketAll = () => {
    return axios
      .get('http://localhost:5000/tickets/getAll')
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
        const itemData = `${item.name.toUpperCase()} ${item.email.toUpperCase()} ${item.message.toUpperCase()} ${item.status}`;
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
      this.getTicketAll();
    }
  };

  handleShow = (ticketNumber) => this.setState({ show: true, ticketNumber: ticketNumber });

  componentDidMount() {
    this.getTicketAll();
  }

  statusName = (status) => {
    switch (status) {
      case 'open':
        return <Badge pill variant="primary">Open</Badge>;
      case 'closed':
        return <Badge pill variant="success">Closed</Badge>;
      default:
        return <Badge pill variant="primary">Open</Badge>;
    }
  };

  changeStatus = (ticketNumber, status) => {
    return axios
      .put('http://localhost:5000/tickets/changeStatus', {
        ticketNumber,
        status,
      })
      .then((response) => {
        this.getTicketAll();
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  statusFilter = (status) => {
    return axios
      .post('http://localhost:5000/tickets/statusFilter', {
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

  postReply = async (ticketNumber, message) => {
    try {
      const sender = 'admin';
      const response = await axios.post('http://localhost:5000/sendMessage/', {
        ticketNumber,
        sender,
        message,
      });
  
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };
  
  handleAddMessage = () => {
    const { ticketNumber, message } = this.state;
    this.postReply(ticketNumber, message); // Corrected the function call
    this.setState({
      show: false,
    });
    this.getTicketAll();
  };
  
  handleConfirmDelete = () => {
    // Trigger the deleteTicket function with the ticket number to delete
    if (this.state.ticketToDelete) {
      this.deleteTicket(this.state.ticketToDelete);
      this.setState({ ticketToDelete: null }); // Reset the state after deletion
    }
  };

  deleteTicket = (ticketNumber) => {
    this.setState({ showDeleteConfirmation: false });
    return axios
      .delete(`http://localhost:5000/tickets/delete/${ticketNumber}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
          this.getTicketAll();
        } else {
          console.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container mt-4">
        {this.state.role === 1 && (
          <div className="jumbotron mt-5">
            <div className="col-sm-12 mx-auto">
              <h1 className="text-center">Admin Page</h1>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <Button variant="primary" className="mx-2 btn-sm" onClick={() => this.statusFilter('open')}>
                  Open
                </Button>
                <Button variant="success" className="mx-2 btn-sm" onClick={() => this.statusFilter('closed')}>
                  Closed
                </Button>
                <Button variant="dark" className="mx-2 btn-sm" onClick={() => this.getTicketAll()}>
                  ALL
                </Button>
              </div>
              <div>
                <input
                  style={{ width: "200px" }}
                  value={this.state.search}
                  placeholder="Search Ticket Details"
                  type="text"
                  onChange={this.editSearchTerm}
                  className="form-control"
                />
              </div>
            </div>

            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Change Status</th>
                  <th>Add Message</th>
                  <th>Delete Ticket</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.length > 0 &&
                  this.state.data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ticketNumber}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td style={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.message}
                      </td>
                      <td>{this.statusName(row.status)}</td>
                      <td>
                        <Dropdown onSelect={(selectedKey) => this.changeStatus(row.ticketNumber, selectedKey)}>
                          <Dropdown.Toggle size="sm" variant="success" id={`dropdown-basic-${index}`}>
                            {row.status === 'open' ? 'Open' : 'Closed'}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="open">Open</Dropdown.Item>
                            <Dropdown.Item eventKey="closed">Closed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                      <td>
                        <Button
                          name="addButton"
                          size="sm"
                          variant="primary"
                          onClick={() => this.handleShow(row.ticketNumber)}
                        >
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
                                <input
                                  type="text"
                                  name="message"
                                  value={this.state.message}
                                  onChange={this.handleChange}
                                  className="form-control"
                                />
                              </label>
                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => this.handleAddMessage()}
                            >
                              Add Message
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>

                      <td>
                        <Button
                          name="deleteButton"
                          size="sm"
                          variant="danger"
                          onClick={() => this.setState({ showDeleteConfirmation: true, ticketToDelete: row.ticketNumber })}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Modal show={this.state.showDeleteConfirmation} onHide={() => this.setState({ showDeleteConfirmation: false, ticketToDelete: null })}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this ticket?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({ showDeleteConfirmation: false, ticketToDelete: null })}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={this.handleConfirmDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Admin;
