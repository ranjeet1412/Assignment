import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Table, Button, Row, Col } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchEmployees();
  }, [authState.user.token]);

  const navigate = useNavigate()
  const fetchEmployees = async () => {
    try {
      const token = authState.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3001/api/users", config);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const filterByLocation = async () => {
    try {
      const token = authState.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        "http://localhost:3001/api/filter/location",
        config
      );
      console.log("res ==>", res.data);

      setEmployees(res.data);
    } catch (error) {
      console.error("Error filtering employees by location:", error);
    }
  };

  const filterByName = async (order) => {
    try {
      const token = authState.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `http://localhost:3001/api/filter/name/${order}`,
        config
      );
      setEmployees(res.data);
    } catch (error) {
      console.error("Error filtering employees by name:", error);
    }
  };

  return (
    <Container>
     <Row className="mb-2 mt-2">
      <Col>
        <div className="text-end me-3">
        <Button color="warning" onClick={() => navigate("/departments")}>View Department</Button>
        </div>
      </Col>
     </Row>
      <Row className="mt-5">
        <Col md="1"></Col>
        <Col md="10">
          <h1 className="text-center mb-3">Employee List</h1>
          <div className="mb-3">
            <Button color="primary" className="me-2" onClick={fetchEmployees}>
              Refresh
            </Button>
            <Button
              color="secondary"
              className="me-2"
              onClick={filterByLocation}
            >
              Filter by Location
            </Button>
            <Button
              color="secondary"
              className="me-2"
              onClick={() => filterByName("asc")}
            >
              Filter by Name (Asc)
            </Button>
            <Button
              color="secondary"
              className="me-2"
              onClick={() => filterByName("desc")}
            >
              Filter by Name (Desc)
            </Button>
          </div>
          <Table striped className="table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Role</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.username}</td>
                  <td>{employee.role}</td>
                  <td>{employee.location}</td>
                  <td>
                    <Link to={`/employeelist/${employee._id}`}>
                      <Button color="info" className="me-2">
                        View Details
                      </Button>
                    </Link>
                    {authState.user.role === "manager" && (
                      <Link to={`/employeelist/${employee._id}/edit`}>
                        <Button color="warning">Edit</Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="1"></Col>
      </Row>
    </Container>
  );
};

export default EmployeeList;
