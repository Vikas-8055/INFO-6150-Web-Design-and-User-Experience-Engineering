import React, { useState } from "react";
import axios from "axios";
import "./AddJobs.css";

const AddJobs = () => {
  const [jobData, setJobData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3010/user/job/create", jobData);
      console.log("Response:", response.data);
      alert("Job added successfully!");
    } catch (error) {
      console.error("Error adding job:", error.response?.data || error.message);
      alert("Failed to add job.");
    }
  };

  return (
    <div className="addjobs-container">
      <h1>Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={jobData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={jobData.jobTitle}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobs;