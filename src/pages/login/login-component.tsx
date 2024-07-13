import React, { useState } from 'react';
import Login3D from '../../component/Canvas3D/Login3D';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation example
    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    // Handle form submission logic here
    // Example: API call, form reset, etc.
    console.log('Form submitted:', { email, password });

    // Reset form fields (optional)
    setEmail('');
    setPassword('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'lightblue' }}>
      <div className="p-4 bg-red" style={{ width: 400, height: 500 }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-3">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheck1"
              />
              <label className="form-check-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
      <Login3D/>
    </div>
  );
};

export default Login;
