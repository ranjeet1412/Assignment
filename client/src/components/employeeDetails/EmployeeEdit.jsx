import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

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
      const token = authState.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `http://localhost:3001/api/users/${id}`,
        employee,
        config
      );
      navigate("/employeelist");
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  return (
    <Container>
      <Row>
        <h1 className="text-center">Edit Employee</h1>

        <Col md="3"></Col>
        <Col md="6">
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
                type="select"
                name="role"
                id="role"
                value={employee.role}
                onChange={handleChange}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </Input>
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
            <div className="text-center">
              <Button type="submit" color="primary">
                Save
              </Button>
              <Button type="button" color="warning ms-3" onClick={() => navigate("/employeelist")}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default EmployeeEdit;
