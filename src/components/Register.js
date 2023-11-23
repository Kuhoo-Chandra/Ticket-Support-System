import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

const Register = ({ onLogin }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to register the user
      const response = await axios.post('http://localhost:5000/users/register', user);

      // Check if the registration was successful
      if (response.data.message === 'User registered successfully') {
        console.log('Registered user:', user);
        const authToken = response.data.token; // Adjust the property based on your API response
        localStorage.setItem('usertoken', authToken);
        onLogin();
        // Redirect after successful registration
        navigate('/');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="first_name">First name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter your first name"
                value={user.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter your last name"
                value={user.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
  <label>Role</label>
  <div>
    <div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        name="role"
        value="user"
        checked={user.role === 'user'}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="user">User</label>
    </div>
    <div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        name="role"
        value="admin"
        checked={user.role === 'admin'}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="admin">Admin</label>
    </div>
  </div>
</div>

            <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
