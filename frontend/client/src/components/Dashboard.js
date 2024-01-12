import React from 'react';
import Card from './Card';

const Dashboard = () => {
 
  const totalPrescriptions = 500;
  const totalRevenue = '$10,000';

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <Card title="Total Prescriptions" value={totalPrescriptions} />
        <Card title="Total Revenue" value={totalRevenue} />
        
      </div>
    </div>
  );
};

export default Dashboard;
