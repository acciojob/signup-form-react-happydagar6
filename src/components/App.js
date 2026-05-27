import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); // Default value is male
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Clear previous messages on new submission
    setError('');
    setWelcomeMessage('');

    // Priority 1: Check if any fields are empty (including gender)
    if (!name || !email || !gender || !phoneNumber || !password) {
      setError('All fields are mandatory');
      return;
    }

    // Priority 2: Check if Name is alphanumeric (spaces allowed)
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(name)) {
      setError('Name is not alphanumeric');
      return;
    }

    // Priority 3: Check if Email contains '@'
    if (!email.includes('@')) {
      setError('email must contain @');
      return;
    }

    // Priority 4: Check Gender values
    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      setError('Please identify as male, female or others');
      return;
    }

    // Priority 5: Check if Phone Number contains only numbers
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone Number must contain only numbers');
      return;
    }

    // Priority 6: Check Password length (must be at least 6)
    if (password.length < 6) {
      setError('Password must contain atleast 6 letters');
      return;
    }

    // If all validations pass, extract username from email and show welcome message
    const username = email.split('@')[0];
    setWelcomeMessage(`Hello ${username}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Renders the success message. Removed static heading so Cypress finds this easily */}
      {welcomeMessage && <h2>{welcomeMessage}</h2>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        
        <input 
          type="text" 
          placeholder="Name" 
          data-testid="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <input 
          type="text" 
          placeholder="Email address" 
          data-testid="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <select 
          data-testid="gender" 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        
        <input 
          type="text" 
          placeholder="Phone Number" 
          data-testid="phoneNumber" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          data-testid="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <button type="submit" data-testid="submit">
          Submit
        </button>
      </form>

      {/* Renders the error exactly inside a <span> tag as requested by Cypress */}
      {error && <span style={{ color: 'red', display: 'block', marginTop: '15px' }}>{error}</span>}
      
    </div>
  );
};

export default App;