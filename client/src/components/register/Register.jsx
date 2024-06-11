import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "reactstrap";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "employee",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { username, password, role, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData
      );
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Register</h1>
      <Row>
        <Col md="3"></Col>
        <Col md="6">
          <Form onSubmit={onSubmit}>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                value={role}
                onChange={onChange}
                required
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
                value={location}
                onChange={onChange}
                required
              />
            </FormGroup>
            <div className="text-center">
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Register"}
              </Button>
            </div>
          </Form>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default Register;
