import image from '../assets/authAssets/auth_image.png';
import styles from '../styles/AuthPage.module.css';

function AuthImage() {
  return (
    <img src={image} alt="Creative characters" className={styles.authImage} />
  );
}

export default AuthImage;