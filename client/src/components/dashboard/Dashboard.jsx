import React, { useEffect, useState } from "react";
import DepartmentForm from "../department/DepartmentForm";
import DepartmentList from "../department/DepartmentList";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  console.log("users ==>", users);

  useEffect(() => {
    // Fetch all users to assign as managers or employees
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => setUsers(res.data))
      .catch((error) =>
        console.error("Error fetching users:", error.response.data.error)
      );
  }, []);

  
  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
