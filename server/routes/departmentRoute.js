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
departmentRoute.post('/', authenticate, isManager, createDepartment);

// Get all departments
departmentRoute.get('/', authenticate, getDepartments);

// Get a single department
departmentRoute.get('/:id', authenticate, getDepartment);

// Update a department (manager only)
departmentRoute.put('/:id', authenticate, isManager, updateDepartment);

// Delete a department (manager only)
departmentRoute.delete('/:id', authenticate, isManager, deleteDepartment);

