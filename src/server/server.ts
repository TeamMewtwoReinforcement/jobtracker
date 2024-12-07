import express , { Request, Response, NextFunction } from "express";
import { CustomError } from '../types.ts'

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import userRoutes from "./routes/userRoutes.ts";
import jobRoutes from "./routes/jobRoutes.ts";
import cookieParser from 'cookie-parser';

const app = express();
const PORT: number = 3000;

console.log("Server script loaded");

import cors from 'cors';
import sessionController from "./controllers/sessionController.ts";
app.use(cors());  // Allow all origins by default
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());
//app.use(cookieParser());

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, ".../dist")));

// Main route - serve main HTML file
app.get("/", sessionController.verifyToken, (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

// User Routes
app.use("/user", userRoutes);

// Job Routes
app.use("/job", sessionController.verifyToken, jobRoutes)

// Catch-all route handler for any requests to an unknown route
app.use('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
})

app.use((req: Request, res: Response, next) => {
    res.status(404).send('404 Not Found');
});

// Global error handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

console.log("About to start the server...")
//start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });   
  

export default app;

// ROUTES
// signup - DONE 
// login route - DONE (need to validate tokens for future db requests from client)
// post - createJobApp (post job details to db)
// get - jobApps
// patch - update job details
// delete job app

