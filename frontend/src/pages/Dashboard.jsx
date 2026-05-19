import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/complaints");

        const complaints = res.data;

        setStats({
          total: complaints.length,
          pending: complaints.filter(
            (c) => c.status === "Pending"
          ).length,
          resolved: complaints.filter(
            (c) => c.status === "Resolved"
          ).length
        });

      } catch (error) {
        console.log("DASHBOARD ERROR:", error.response?.data || error);
      }
    };

    fetchStats();
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