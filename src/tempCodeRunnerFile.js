import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import SupportForm from './components/SupportForm';
import Footer from './components/Footer';
import NewTabPage from './components/NewTabPage';
import CheckTicketForm from './components/CheckTicketForm';
import { Card } from 'react-bootstrap';

import Home from './components/Home';
const appStyles = {
  background: 'linear-gradient(to bottom, #0074c7, #ffffff)',
};

function App() {
  return (
    <Router>
      <div style={appStyles}>
        <Navbar />
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <AboutUs />
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-ticket" element={<SupportForm />} />
                    <Route path="/check-ticket" element={<CheckTicketForm />} />
                    <Route path="/new-tab-page" element={<NewTabPage />} />
                  </Routes>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
