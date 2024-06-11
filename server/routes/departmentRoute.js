import express from 'express';
import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} from '../controller/departmentController.js';
import { authenticate, isManager } from '../middleware/authMiddleware.js';

export const departmentRoute = express.Router();

// Create a new department (manager only)
departmentRoute.post('/departments', authenticate, isManager, createDepartment);

// Get all departments
departmentRoute.get('/departments', authenticate, getDepartments);

// Get a single department
departmentRoute.get('/departments/:id', authenticate, getDepartment);

// Update a department (manager only)
departmentRoute.put('/departments/:id', authenticate, isManager, updateDepartment);

// Delete a department (manager only)
departmentRoute.delete('/departments/:id', authenticate, isManager, deleteDepartment);

