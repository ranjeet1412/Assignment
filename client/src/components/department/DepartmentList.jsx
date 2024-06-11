import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.user.token}`,
      },
    };

    axios
      .get("http://localhost:3001/api/departments", config)
      .then((res) => setDepartments(res.data))
      .catch((error) =>
        console.error("Error fetching departments:", error.response.data.error)
      );
  }, [authState.user.token]);

  const deleteDepartment = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.user.token}`,
      },
    };

    axios
      .delete(`http://localhost:3001/api/departments/${id}`, config)
      .then(() =>
        setDepartments(
          departments.filter((department) => department._id !== id)
        )
      )
      .catch((error) =>
        console.error("Error deleting department:", error.response.data.error)
      );
  };

  return (
    <Container>
      <Row>
        <h1 className="text-center">Department Page</h1>
        <Col md={2}>
          <Link to="/employeelist" className="btn btn-secondary mb-3">
            Back
          </Link>
        </Col>
        <Col md={8} className="mt-5">
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Employees</th>
                {authState.user && authState.user.role === "manager" && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {departments.map((department , index) => (
                <tr key={department._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{department.name}</td>
                  <td>
                    {department.employees.map((emp) => emp.username).join(", ")}
                  </td>
                  {authState.user && authState.user.role === "manager" && (
                    <td>
                      <Button
                        color="warning"
                        className="me-3"
                        onClick={() =>
                          navigate(`/departments/${department._id}/edit`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => deleteDepartment(department._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={2}>
          {authState.user && authState.user.role === "manager" && (
            <Button
              color="primary"
              onClick={() => navigate("/departments/new")}
            >
              Create Department
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DepartmentList;
