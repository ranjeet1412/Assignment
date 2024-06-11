import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/departments')
      .then(res => setDepartments(res.data))
      .catch(error => console.error('Error fetching departments:', error.response.data.error));
  }, []);

  const deleteDepartment = id => {
    axios.delete(`http://localhost:3001/api/departments/${id}`)
      .then(() => setDepartments(departments.filter(department => department._id !== id)))
      .catch(error => console.error('Error deleting department:', error.response.data.error));
  };

  return (
    <div>
      <h1>Departments</h1>
      {authState.user && authState.user.role === 'manager' && (
        <Button color="primary" onClick={() => navigate('/departments/new')}>
          Create Department
        </Button>
      )}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Manager</th>
            <th>Employees</th>
            {authState.user && authState.user.role === 'manager' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.manager?.username}</td>
              <td>
                {department.employees.map(emp => emp.username).join(', ')}
              </td>
              {authState.user && authState.user.role === 'manager' && (
                <td>
                  <Button color="warning" onClick={() => navigate(`/departments/${department._id}/edit`)}>Edit</Button>
                  <Button color="danger" onClick={() => deleteDepartment(department._id)}>Delete</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentList;
