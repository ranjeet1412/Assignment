import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
} from "reactstrap";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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

  return (
    <Container>
      <Row className="mt-3">
        <Col lg="3" md="3">
          <Link to="/employeelist" className="btn btn-secondary ">
            Back
          </Link>
        </Col>
        <Col lg="6" md="6">
        <Card style={{ width: "400px", marginTop:"50px" }}>
          <CardBody>
            <CardTitle tag="h5">Employee Details</CardTitle>
            {employee ? (
              <CardText>
                <strong>Username:</strong> {employee.username}
                <br />
                <strong>Role:</strong> {employee.role}
                <br />
                <strong>Location:</strong> {employee.location}
              </CardText>
            ) : (
              <p>Loading employee details...</p>
            )}
          </CardBody>
        </Card>
        </Col>
       
        <Col lg="3" md="3"></Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetails;
