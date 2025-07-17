import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import styles from '../styles/LoginForm.module.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginForm({ toggleView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(''); // Local state for the message

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error: reduxError } = useSelector((state) => state.auth);

  // This effect listens for changes in the error from Redux
  useEffect(() => {
    if (reduxError) {
      setDisplayError(reduxError); // Set the error message to be displayed

      // Set a timer to clear the message after 3 seconds
      const timer = setTimeout(() => {
        setDisplayError('');
      }, 2000);

      // Clean up the timer if the component unmounts or the error changes
      return () => clearTimeout(timer);
    }
  }, [reduxError]); // Re-run the effect when the Redux error changes

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Welcome Back!</h2>
      <p className={styles.subtitle}>We're so excited to see you again!</p>
      
      {/* Render the error message from local state */}
      {displayError && <p className={styles.error}>{displayError}</p>}
      
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
        
        <button type="submit" className={styles.loginButton} disabled={isLoading}>
           {isLoading ? 'Logging In...' : 'Log In'}
        </button>
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