import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/authSlice';
import styles from '../styles/SignUpForm.module.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUpForm({ toggleView }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');          // ← new
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error: serverError } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 1) Front‑end mismatch check
    if (password !== confirmPassword) {
      setLocalError("Passwords don't match.");
      return;
    }
    setLocalError('');

    // 2) Dispatch the thunk, including confirmPassword
    try {
      const result = await dispatch(
        signupUser({ username, email, password, confirmPassword })
      );
      if (signupUser.fulfilled.match(result)) {
        toggleView(); // Switch to login on success
      }
    } catch {
      // any server-side errors will land in serverError
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create an Account</h2>

      {/* show either local mismatch error or backend message */}
      {(localError || serverError) && (
        <p className={styles.error}>{localError || serverError}</p>
      )}

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
          <span
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

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
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.eyeIcon}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        
        <button
          type="submit"
          className={styles.signupButton}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Continue'}
        </button>
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
