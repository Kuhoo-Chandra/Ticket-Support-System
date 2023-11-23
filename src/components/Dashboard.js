import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Modal, Table } from 'react-bootstrap';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data : [],
      ticketNumber: '',
      issue: '',
      status: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getTicket = async () => {
    try {
      const authToken = localStorage.getItem('usertoken');
      const response = await fetch('http://localhost:5000/tickets/getTicketAll', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user tickets');
      }
  
      const userTickets = await response.json();
      console.log('User Tickets:', userTickets);
      // Update your dashboard state or UI with the user tickets
      this.setState({ data: userTickets }); // Corrected this line
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  };
  
  

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = (ticketNumber) => this.setState({ show: true, ticketNumber: ticketNumber });

  componentDidMount() {
    this.getTicket();
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

  render() {
    return (
      <div className="container mt-4">
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
      </div>
    );
  }
}

export default Dashboard;
