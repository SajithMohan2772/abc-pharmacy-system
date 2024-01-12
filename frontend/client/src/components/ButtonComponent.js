import React from 'react';

const ButtonComponent = ({ onClickAction, showNotification }) => {
  const handleButtonClick = () => {

    setTimeout(() => {
      const success = true; 
      if (success) {
        showNotification('Success! Your action was completed.', 'success');
      } else {
        showNotification('Error! Something went wrong.', 'error');
      }
    }, 2000); 
  };

  return (
    <button onClick={handleButtonClick}>Perform Action</button>
  );
};

export default ButtonComponent;