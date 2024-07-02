import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
    return (
      <div className="dashboard-container">
      <h2>Welcome to Admin Dashboard</h2>
      <div className="buttons-container">
        <Link to="/addproduct">
          <button>Add Products</button>
        </Link>
        <Link to="/products">
          <button>Products</button>
        </Link>
        <Link to="/orders">
          <button>Orders</button>
        </Link>
      </div>
    </div>
    )
}

export default Dashboard