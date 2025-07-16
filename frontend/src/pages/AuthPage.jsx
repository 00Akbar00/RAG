import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import AuthImage from '../components/AuthImage';
import styles from '../styles/AuthPage.module.css';

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className={styles.authContainer}>
      {/* The image section now comes first */}
      <div className={styles.imageSection}>
        <AuthImage />
      </div>
      
      {/* The form section is now second, so it will appear on the right */}
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