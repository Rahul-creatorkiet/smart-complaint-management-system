import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const StatusUpdate = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, { status });

      alert("Status updated successfully");

      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <>
      <Navbar />

      <div className="status-page">
        <h1>Complaint Status Update</h1>

        {complaints.map((complaint) => (
          <div key={complaint._id} className="status-card">
            <h3>{complaint.title}</h3>

            <p><strong>Current Status:</strong> {complaint.status}</p>

            <select
              defaultValue={complaint.status}
              onChange={(e) =>
                updateStatus(complaint._id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatusUpdate;