import React, { useState, useEffect } from 'react';
import './Notification.css'; 

const Notification = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type} ${show ? 'show' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;