import { UserModel } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    // console.log("all user", allUser);
    res.status(200).send(allUser);
  } catch (error) {
    console.log("error while fetching user", error);
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const filterEmployeesByLocation = async (req, res) => {
  try {
    const employees = await UserModel.find({}).sort({ location: 1 });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error filtering employees by location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterEmployeesByName = async (req, res) => {
  try {
    const { order } = req.params;
    let employees;
    if (order === "asc") {
      employees = await UserModel.find({}).sort({ username: 1 });
    } else if (order === "desc") {
      employees = await UserModel.find({}).sort({ username: -1 });
    } else {
      return res.status(400).json({ error: "Invalid sorting order" });
    }
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error filtering employees by name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role, location } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.role = role;
    user.location = location;
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};











