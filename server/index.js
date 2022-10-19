import express from "express";
//import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import db from "../src/database/models";
import initAuthController from "../src/controllers/AuthController";
import initEmployeeController from "../src/controllers/EmployeeController";
import initTimesheetController from "../src/controllers/TimesheetController";
import initPayrollController from "../src/controllers/PayrollController";
import cors from "cors"; //comment out for prod

const AuthController = initAuthController(db);
const EmployeeController = initEmployeeController(db);
const TimesheetController = initTimesheetController(db);
const PayrollController = initPayrollController(db);

const PORT = process.env.PORT || 3004;
const env = process.env.NODE_ENV || "development";
const app = express();

if (env === "development") {
  app.use(cors());
}

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

/*
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});
*/

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello there! Welcome to the server!" });
});

app.post("/auth/login", AuthController.login);
app.get("/auth/logout", AuthController.logout);
app.post("/auth/reauth", AuthController.reAuth);

app.get("/user/:userId", EmployeeController.getEmployee);
app.post("/add-employee", EmployeeController.addEmployee);
app.post("/update-employee/:userId", EmployeeController.postEmployee);
app.get("/delete-employee/:userId", EmployeeController.deleteEmployee);

app.get("/timesheet", TimesheetController.getTimesheet);
app.post("/update-timesheet", TimesheetController.updateTimesheet);
app.post("/lock-timesheet", TimesheetController.lockTimesheet);

app.get("/payroll", PayrollController.getOutstandingPayment);
app.post("/update-payroll", PayrollController.payOutstanding);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
