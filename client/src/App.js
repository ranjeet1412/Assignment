import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import DepartmentList from "./components/department/DepartmentList";
import DepartmentForm from "./components/department/DepartmentForm";
import EmployeeDetails from "./components/employeeDetails/EmployeeDetails";
import EmployeeList from "./components/employeeDetails/EmployeeList";
import EmployeeEdit from "./components/employeeDetails/EmployeeEdit";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* private routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/employeelist" element={<EmployeeList />} />
            <Route path="/employeelist/:id" element={<EmployeeDetails />} />
            <Route path="/employeelist/:id/edit" element={<EmployeeEdit />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/new" element={<DepartmentForm />} />
            <Route path="/departments/:id/edit" element={<DepartmentForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
