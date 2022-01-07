import React, { useEffect, useState } from 'react';
import './styles.css';

const Notification = (props) => {
  const icons = {
    success: <i className="bx bxs-check-circle"></i>,
    err: <i className="bx bx-error"></i>,
  };

  const { type = 'success', message = '', duration = 4000 } = props;

  const [exit, setExit] = useState(false);

  const styles = {
    animation: `slideInLeft ease 0.3s, fadeOut linear 1s ${(
      duration / 1000
    ).toFixed(2)}s forwards`,
  };

  const handleCloseNotification = () => {
    setExit(false);
    props.dispatch({
      type: 'REMOVE_NOTIFICATION',
      id: props.id,
    });
  };

  useEffect(() => {
    if (exit) handleCloseNotification();
    setTimeout(() => {
      handleCloseNotification();
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exit]);

  return (
    <div className={`toast toast--${type}`} style={styles}>
      <div className="toast__icon">{icons[type]}</div>
      <div className="toast__body">
        <h3 className="toast__title">Thông báo</h3>
        <p className="toast__msg">{message}</p>
      </div>
      <div className="toast__close" onClick={handleCloseNotification}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Notification;
