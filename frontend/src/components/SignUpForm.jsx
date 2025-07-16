import { useState } from 'react';
import styles from '../styles/SignUpForm.module.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUpForm({ toggleView }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match. Please try again.");
      return;
    }

    if (!email || !password || !username) {
      setError('Please complete all fields.');
      return;
    }

    try {
      console.log('Creating account with:', { username, email, password });
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Could not create account. Please try again.');
      }
      
      const data = await response.json();
      console.log('Sign up successful:', data);
      toggleView();

    } catch (err) {
      setError(err.message);
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create an Account</h2>
      
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">USERNAME</label>
        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        {/* New Confirm Password Field */}
        <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.eyeIcon}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        
        <button type="submit" className={styles.signupButton}>Continue</button>
      </form>
      
      <p className={styles.switchView}>
        <span onClick={toggleView} className={styles.link}>
          Already have an account?
        </span>
      </p>
    </div>
  );
}

export default SignUpForm;