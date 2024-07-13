import React, { useState } from 'react';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation example
    if (!firstName || !lastName || !phoneNumber || !location) {
      alert('Please fill in all fields');
      return;
    }

    // Handle form submission logic here
    // Example: API call for sign up
    console.log('Form submitted:', { firstName, lastName, phoneNumber, location });

    // Reset form fields (optional)
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setLocation('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'lightblue' }}>
      <div className="p-4 bg-red" style={{ width: 400 }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-3">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="inputFirstName" className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPhoneNumber" className="form-label">Phone number</label>
            <input
              type="tel"
              className="form-control"
              id="inputPhoneNumber"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLocation" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="inputLocation"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
