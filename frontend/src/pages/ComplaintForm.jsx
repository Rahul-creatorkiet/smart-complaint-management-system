import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: ""
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints", formData);

      alert("Complaint submitted successfully");

    } catch (error) {
      alert("Submission failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="complaint-form" onSubmit={submitHandler}>
          <h2>Register Complaint</h2>

          <input name="name" placeholder="Name" onChange={changeHandler} required />
          <input name="email" placeholder="Email" onChange={changeHandler} required />
          <input name="title" placeholder="Complaint Title" onChange={changeHandler} required />
          <textarea
            name="description"
            placeholder="Complaint Description"
            onChange={changeHandler}
            required
          />
          <input name="category" placeholder="Category" onChange={changeHandler} required />
          <input name="location" placeholder="Location" onChange={changeHandler} required />

          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </>
  );
};

export default ComplaintForm;