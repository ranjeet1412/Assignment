import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    username: "",
    role: "",
    location: "",
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${id}`);
        setEmployee(res.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/users/${id}`, employee);
      navigate("/employeelist"); 
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Edit Employee</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={employee.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="role">Role</Label>
          <Input
            type="text"
            name="role"
            id="role"
            value={employee.role}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            value={employee.location}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeeEdit;
