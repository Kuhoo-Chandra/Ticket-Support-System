import React, { useState } from 'react';

function SupportForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting form with values:', { name, email, message });
      const authToken = localStorage.getItem('usertoken');
      
      const response = await fetch('http://localhost:5000/create-ticket/', {
  method: 'POST',
  body: JSON.stringify({ name, email, message }),
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  },
});


      if (response.ok) {
        console.log('Ticket created successfully');
        setSubmitted(true);
      } else {
        console.error('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header bg-primary text-white">Create New Ticket</div>
            <div className="card-body">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea
                      className="form-control"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              ) : (
                <p>Thank you for submitting the form! We will get back to you soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportForm;



