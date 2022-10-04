import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import db from "../src/database/models";
import initEmployeeController from "../src/controllers/EmployeeController";

const EmployeeController = initEmployeeController(db);

const PORT = process.env.PORT || 3004;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello there! Welcome to the server!" });
});

app.post("/add-employee", EmployeeController.addEmployee);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
