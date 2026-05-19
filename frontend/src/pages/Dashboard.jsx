import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/complaints");

      const complaints = res.data;

      const total = complaints.length;

      const pending = complaints.filter(
        (item) => item.status === "Pending"
      ).length;

      const resolved = complaints.filter(
        (item) => item.status === "Resolved"
      ).length;

      setStats({
        total,
        pending,
        resolved
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h1>Smart Complaint Dashboard</h1>

        <div className="stats">
          <div className="stat-card">
            <h2>{stats.total}</h2>
            <p>Total Complaints</p>
          </div>

          <div className="stat-card">
            <h2>{stats.pending}</h2>
            <p>Pending Cases</p>
          </div>

          <div className="stat-card">
            <h2>{stats.resolved}</h2>
            <p>Resolved Cases</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;