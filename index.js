// app.js
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { renderPage, jobPage, recruitmentPage, handleSignUp, handleLogin, JobDetail, fileHandle } from "./controllers/job.controller.js";
import session from "express-session";
import { auth } from "./middleware/auth.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import { sendConfirmationEmailMiddleware } from "./middleware/sendConfirmationMail.js";
import bodyParser from "body-parser";
import { editResponse, addJob, appHandler } from "./controllers/recruiter.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ dest: "uploads/" });

const app = express();

// Session middleware configuration
app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

// Cookie parser middleware
app.use(cookieParser());

// Static file serving
app.use(express.static(join(__dirname, 'public')));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.get("/", renderPage);
app.get("/jobs", jobPage);
app.post("/apply", upload.single("resume"), sendConfirmationEmailMiddleware, fileHandle);
app.get("/detail/:id", JobDetail);
app.post("/register", handleSignUp);
app.post("/login", handleLogin);
app.post("/edit/:id", editResponse);
app.post("/addJob", addJob);
app.get("/apply/:id", appHandler);

// Protect the /recruitment route with authentication middleware
app.post("/recruitment", auth, recruitmentPage);
app.get("/recruitment", auth, recruitmentPage);

export default app;
