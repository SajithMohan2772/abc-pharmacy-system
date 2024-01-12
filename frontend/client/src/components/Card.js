import React from 'react';
import "../styles/Card.css"

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
};

export default Card;