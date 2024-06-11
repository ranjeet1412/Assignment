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
    manager: '',
    employees: []
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users to assign as managers or employees
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(error => console.error('Error fetching users:', error.response.data.error));

    if (id) {
      // Fetch department data if id is provided
      axios.get(`http://localhost:3001/api/departments/${id}`)
        .then(res => setFormData(res.data))
        .catch(error => console.error('Error fetching department:', error.response.data.error));
    }
  }, [id]);

  const { name, manager, employees } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/api/departments/${id}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/departments', formData);
      }
      navigate('/departments');
    } catch (error) {
      console.error('Error saving department:', error.response.data.error);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Edit Department' : 'Create Department'}</h1>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="manager">Manager</Label>
          <Input
            type="select"
            name="manager"
            value={manager}
            onChange={onChange}
            required
          >
            <option value="">Select Manager</option>
            {users.filter(user => user.role === 'manager').map(user => (
              <option key={user._id} value={user._id}>{user.username}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="employees">Employees</Label>
          <Input
            type="select"
            name="employees"
            value={employees}
            onChange={onChange}
            multiple
          >
            {users.filter(user => user.role === 'employee').map(user => (
              <option key={user._id} value={user._id}>{user.username}</option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">
          {id ? 'Update' : 'Create'}
        </Button>
      </Form>
    </Container>
  );
};

export default DepartmentForm;
