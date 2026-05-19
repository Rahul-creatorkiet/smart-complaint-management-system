import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import ComplaintCard from "../components/ComplaintCard";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const fetchComplaints = async () => {
    let url = "/complaints";

    if (category) {
      url += `?category=${category}`;
    }

    const res = await API.get(url);
    setComplaints(res.data);
  };

  const searchLocation = async () => {
    const res = await API.get(
      `/complaints/search/location?location=${location}`
    );

    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/complaints/${id}`, { status });
    fetchComplaints();
  };

  const deleteComplaint = async (id) => {
    await API.delete(`/complaints/${id}`);
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, [category]);

  return (
    <>
      <Navbar />

      <div className="list-container">
        <h2>All Complaints</h2>

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
        </select>

        <input
          placeholder="Search by location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={searchLocation}>Search</button>

        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
            onStatusUpdate={updateStatus}
            onDelete={deleteComplaint}
          />
        ))}
      </div>
    </>
  );
};

export default ComplaintList;