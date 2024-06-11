import Department from '../models/departmentModel.js';

// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const { name, employees } = req.body;
    const department = new Department({ name, employees });
    await department.save();
    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('employees');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single department
export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id).populate('employees');
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, employees } = req.body;
    const department = await Department.findByIdAndUpdate(id, { name, employees }, { new: true }).populate('employees');
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json({ message: 'Department updated successfully', department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
