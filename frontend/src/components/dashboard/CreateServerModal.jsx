import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { addServer } from '../../store/serverSlice';
import styles from '../../styles/CreateServerModal.module.css';
import { FaCamera, FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

function CreateServerModal({ isOpen, onRequestClose }) {
  const [serverName, setServerName] = useState("");
  const [serverImage, setServerImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverName.trim()) {
      const newServer = {
        name: serverName.trim(),
        imageUrl: imagePreview || `https://via.placeholder.com/50/7289DA/FFFFFF?text=${serverName.charAt(0).toUpperCase()}`
      };
      dispatch(addServer(newServer));
      onRequestClose();
      setServerName("");
      setServerImage(null);
      setImagePreview("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <button onClick={onRequestClose} className={styles.closeButton}>
            <FaTimes/>
        </button>
        <h2>Customize your server</h2>
        <p>Give your new server a personality with a name and an icon. You can always change it later.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.uploadContainer}>
            <label htmlFor="server-image-upload" className={styles.uploadLabel}>
              {imagePreview ? (
                <img src={imagePreview} alt="Server preview" className={styles.imagePreview} />
              ) : (
                <div className={styles.uploadIcon}>
                  <FaCamera />
                  <span>UPLOAD</span>
                </div>
              )}
            </label>
            <input
              id="server-image-upload"
              type="file"
              accept="image/*,image/gif"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <label htmlFor="server-name" className={styles.inputLabel}>SERVER NAME</label>
          <input
            id="server-name"
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            placeholder="Enter server name"
            required
            className={styles.inputField}
          />

          <div className={styles.footer}>
            <button type="button" className={styles.backButton} onClick={onRequestClose}>Back</button>
            <button type="submit" className={styles.createButton}>Create</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateServerModal;