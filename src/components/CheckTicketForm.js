import React, { useState } from 'react';

function CheckTicketForm() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleCheckTicket = (e) => {
    e.preventDefault();
    // Handle logic to check the existing ticket using ticketNumber and email
    console.log('Checking existing ticket:', { ticketNumber, email });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">Check Existing Ticket</div>
            <div className="card-body">
              <form onSubmit={handleCheckTicket}>
                <div className="mb-3">
                  <label htmlFor="ticketNumber" className="form-label">Ticket Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ticketNumber"
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Check Ticket</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckTicketForm;

