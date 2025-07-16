import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../styles/LoginForm.module.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
//import { BASE_URL } from '../config/apiConfig';

function LoginForm({ toggleView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // For debugging purposes
    console.log('Login successful, navigating to dashboard...');
    
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials. Please try again.');
      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/dashboard'); // Navigate on success
    } catch (err) {
      setError(err.message);
      console.error('Login failed:', err);
    }
  
  };

  return (
    <div className={styles.formContainer}>
      <h2>Welcome Back!</h2>
      <p className={styles.subtitle}>We're so excited to see you again!</p>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <label htmlFor="email">EMAIL</label>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <label htmlFor="password">PASSWORD</label>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
      
      <p className={styles.switchView}>
        Need an account?{' '}
        <span onClick={toggleView} className={styles.link}>
          Register
        </span>
      </p>
    </div>
  );
}

export default LoginForm;