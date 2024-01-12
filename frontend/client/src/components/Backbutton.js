import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './BackButton.css'; 

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link 
        to={destination}
        className='back-button'
      >
        <p>Back</p>
        
        {/*  <i className="fas fa-arrow-left"></i> */}
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  destination: PropTypes.string,
};

export default BackButton;