import React, { useState } from 'react';
import '../styles/AuthPage.css'; 

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', signupData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={signupData.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={signupData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signupData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;