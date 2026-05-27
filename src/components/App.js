import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Changed default to empty string
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setWelcomeMessage('');

    // Priority 1: Check if any fields are empty
    if (!name || !email || !gender || !phoneNumber || !password) {
      setError('All fields are mandatory');
      return;
    }

    // Priority 2: Name alphanumeric
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(name)) {
      setError('Name is not alphanumeric');
      return;
    }

    // Priority 3: Email @
    if (!email.includes('@')) {
      setError('email must contain @');
      return;
    }

    // Priority 4: Gender
    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      setError('Please identify as male, female or others');
      return;
    }

    // Priority 5: Phone number
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone Number must contain only numbers');
      return;
    }

    // Priority 6: Password length
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

      {error && <span style={{ color: 'red', display: 'block', marginTop: '15px' }}>{error}</span>}
    </div>
  );
};

export default App;