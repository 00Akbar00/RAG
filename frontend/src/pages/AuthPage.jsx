import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import AuthImage from '../components/AuthImage';
import styles from '../styles/AuthPage.module.css';

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { token } = useSelector((state) => state.auth);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  // If user is already authenticated, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.imageSection}>
        <AuthImage />
      </div>
      
      <div className={styles.formSection}>
        {isLoginView ? (
          <LoginForm toggleView={toggleView} />
        ) : (
          <SignUpForm toggleView={toggleView} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;