import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Employees.css"; // Import the CSS file

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3010/user/getAll");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employees-container">
      <h1>All Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.email}>
              <td data-label="Full Name">{employee.fullName}</td>
              <td data-label="Email">{employee.email}</td>
              <td data-label="Type">{employee.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;