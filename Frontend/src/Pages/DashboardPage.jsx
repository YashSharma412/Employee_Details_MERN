import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DashboardPage;