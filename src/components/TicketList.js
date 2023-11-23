import React from 'react';

const mockTickets = [
  { id: 1, title: 'Issue 1', description: 'Description for Issue 1' },
  { id: 2, title: 'Issue 2', description: 'Description for Issue 2' },
  // Add more ticket data as needed
];

function TicketList() {
  return (
    <div>
      <h1>Support Tickets</h1>
      {mockTickets.map((ticket) => (
        <div className="card" key={ticket.id}>
          <div className="card-body">
            <h5 className="card-title">{ticket.title}</h5>
            <p className="card-text">{ticket.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;
