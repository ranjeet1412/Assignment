import express from "express";
import  authRouter  from "./routes/authRoute.js";
import "dotenv/config";
import { mongoose } from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";
import {departmentRoute} from "./routes/departmentRoute.js";

const app = express();

app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL);

// Get the default connection
const db = mongoose.connection;
// Event listener for successful connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event listener for connection error
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});


app.get( "/" , (req, res) =>{
  res.send("hello from backend")
})

app.use( "/api/auth", authRouter);
app.use( "/api/", userRouter);

app.use( "/api/", departmentRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

