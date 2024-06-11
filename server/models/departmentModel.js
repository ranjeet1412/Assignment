import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
