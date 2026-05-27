import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Empty rakha taaki validation sahi trigger ho
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError('');
    setWelcomeMessage('');

    // Priority 1: Check if any fields are empty
    // Gender ko yahan include nahi kar rahe kyunki uske liye specific error message required hai
    if (!name || !email || !phoneNumber || !password) {
      setError('All fields are mandatory');
      return;
    }

    // Name alphanumeric
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nameRegex.test(name)) {
      setError('Name is not alphanumeric');
      return;
    }

    // Email check (Lowercase 'e' as per test requirement)
    if (!email.includes('@')) {
      setError('email must contain @');
      return;
    }

    // Gender check (Empty check + value check)
    if (!gender) {
      setError('All fields are mandatory');
      return;
    }
    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      setError('Please identify as male, female or others');
      return;
    }

    // Phone number
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone Number must contain only numbers');
      return;
    }

    // Password length
    if (password.length < 6) {
      setError('Password must contain atleast 6 letters');
      return;
    }

    // Success Block
    const username = email.split('@')[0];
    setWelcomeMessage(username === 'UMAKANT' ? 'Hello UMAKANT' : `Hello ${username}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {welcomeMessage && <h2>{welcomeMessage}</h2>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}>
        
        <input name="name" type="text" placeholder="Name" data-testid="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input name="email" type="text" placeholder="Email address" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <select name="gender" data-testid="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
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