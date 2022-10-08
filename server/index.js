import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import db from "../src/database/models";
import initEmployeeController from "../src/controllers/EmployeeController";
import initTimesheetController from "../src/controllers/TimesheetController";
import initPayrollController from "../src/controllers/PayrollController";

const EmployeeController = initEmployeeController(db);
const TimesheetController = initTimesheetController(db);
const PayrollController = initPayrollController(db);

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

app.get("/user/:userId", EmployeeController.getEmployee);
app.post("/add-employee", EmployeeController.addEmployee);
app.post("/update-employee/:userId", EmployeeController.postEmployee);
app.get("/delete-employee/:userId", EmployeeController.deleteEmployee);

app.get("/timesheet", TimesheetController.getTimesheet);
app.post("/update-timesheet", TimesheetController.updateTimesheet);

app.get("/payroll", PayrollController.getOutstandingPayment);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
