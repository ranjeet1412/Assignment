import express from "express";
import {
  deleteUserController,
  filterEmployeesByLocation,
  filterEmployeesByName,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controller/userController.js";

export const userRouter = express.Router();
userRouter.get("/filter/location", filterEmployeesByLocation);
userRouter.get("/filter/name/:order", filterEmployeesByName);

userRouter.get("/users", getAllUsersController);
userRouter.get("/users/:id", getUserByIdController);
userRouter.put("/users/:id", updateUserController);
userRouter.delete("/users/:id", deleteUserController);
