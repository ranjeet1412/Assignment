import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", formData);
      login({ token: res.data.token, userId: res.data.userId , role: res.data.role });
      navigate("/employeelist");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Login</h1>
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
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </Form>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Container>
  );
};

export default Login;
