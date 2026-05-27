import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Default empty to trigger validation
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError('');
    setWelcomeMessage('');

    // Specific field validation checks (In order of priority)
    // 1. Name Check
    if (!name) {
      setError('All fields are mandatory');
      return;
    }
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(name)) {
      setError('Name is not alphanumeric');
      return;
    }

    // 2. Email Check
    if (!email) {
      setError('All fields are mandatory');
      return;
    }
    if (!email.includes('@')) {
      setError('email must contain @');
      return;
    }

    // 3. Gender Check
    if (!gender) {
      setError('All fields are mandatory');
      return;
    }
    if (gender !== 'Male' && gender !== 'Female' && gender !== 'Other') {
      setError('Please identify as male, female or others');
      return;
    }

    // 4. Phone Number Check
    if (!phoneNumber) {
      setError('All fields are mandatory');
      return;
    }
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone Number must contain only numbers');
      return;
    }

    // 5. Password Check
    if (!password) {
      setError('All fields are mandatory');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain atleast 6 letters');
      return;
    }

    // Success Block
    const username = email.split('@')[0];
    setWelcomeMessage(username.toLowerCase() === 'umakant' ? 'Hello UMAKANT' : `Hello ${username}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {welcomeMessage && <h2>{welcomeMessage}</h2>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        
        <input name="name" type="text" placeholder="Name" data-testid="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input name="email" type="text" placeholder="Email address" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <select name="gender" data-testid="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        
        <input name="phoneNumber" type="text" placeholder="Phone Number" data-testid="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <input name="password" type="password" placeholder="Password" data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button type="submit" data-testid="submit">Submit</button>
      </form>

      {/* Renders the error exactly inside a <span> tag as requested by Cypress */}
      {error && <span style={{ color: 'red', display: 'block', marginTop: '15px' }}>{error}</span>}
      
    </div>
  );
};

export default App;