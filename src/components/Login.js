import React from 'react';
import { login } from './UserFunctions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
    role: '', 
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:5000/users/login/`, loginData);
  
      if (response.status === 200) {
        const authToken = response.data.token; 
        localStorage.setItem('usertoken', authToken);
        onLogin();
  
        // Check if the user is an admin and navigate accordingly
        if (loginData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <br/>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div><br/>
            <div className="form-group">
  <label htmlFor="role">Select Role:</label>
  <select
    className="form-control"
    name="role"
    value={loginData.role}
    onChange={handleChange}
    required
  >
    <option value="" disabled hidden>Select a role</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
  <br />
</div>
            <button
  type="submit"
  className="btn btn-lg btn-block"
  style={{ backgroundColor: '#795c4d' }}
>
  Sign in
</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
