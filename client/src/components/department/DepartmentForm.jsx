import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';

const DepartmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    employees: []
  });
  const [users, setUsers] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.user.token}`
      }
    };

    axios.get('http://localhost:3001/api/users', config)
      .then(res => {
        const employees = res.data.filter(user => user.role === 'employee');
        setUsers(employees);
        if (id) {
          axios.get(`http://localhost:3001/api/departments/${id}`, config)
            .then(res => {
              setFormData({ ...res.data, employees: res.data.employees.map(employee => employee._id) });
              setSelectedEmployees(res.data.employees.map(employee => employee._id));
            })
            .catch(error => console.error('Error fetching department:', error.response.data.error));
        }
      })
      .catch(error => console.error('Error fetching users:', error.response.data.error));
  }, [authState.user.token, id]);

  const { name } = formData;

  const handleChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployees(prevSelected => [...prevSelected, value]);
    } else {
      setSelectedEmployees(prevSelected => prevSelected.filter(empId => empId !== value));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, employees: selectedEmployees };
      if (id) {
        await axios.put(`http://localhost:3001/api/departments/${id}`, updatedFormData, {
          headers: {
            Authorization: `Bearer ${authState.user.token}`
          }
        });
      } else {
        await axios.post('http://localhost:3001/api/departments', updatedFormData, {
          headers: {
            Authorization: `Bearer ${authState.user.token}`
          }
        });
      }
      navigate('/departments');
    } catch (error) {
      console.error('Error saving department:', error.response.data.error);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Edit Department' : 'Create Department'}</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Employees</Label>
          {users.map(user => (
            <div key={user._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`employee-${user._id}`}
                value={user._id}
                onChange={handleChange}
                checked={selectedEmployees.includes(user._id)}
              />
              <label className="form-check-label" htmlFor={`employee-${user._id}`}>
                {user.username}
              </label>
            </div>
          ))}
        </FormGroup>
        <div className="mb-3">
          <Button type="button" color="secondary" onClick={() => navigate('/departments')}>
            Back
          </Button>
          <Button type="submit" color="primary" className="ms-2">
            {id ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
      <div>
        <h3>Selected Employees</h3>
        {selectedEmployees.map(employeeId => (
          <div key={employeeId}>{users.find(user => user._id === employeeId)?.username}</div>
        ))}
      </div>
    </Container>
  );
};

export default DepartmentForm;
