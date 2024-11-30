import express , { Request, Response, NextFunction } from "express";
import { CustomError } from '../types.ts'

// const path = require("path");
import path from "path";
//import userRoutes from "./routes/userRoutes.ts";
const app = express();
const PORT: number = 3000;
const userRoutes = require("./routes/userRoutes");



// Parse JSON bodies
app.use(express.json());
//app.use(cookieParser());

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

// Main route - serve main HTML file
app.get("/", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

// User Routes
app.use("/user", userRoutes);

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

//start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });   
  

module.exports = app;

// ROUTES
// login route
// signup
// post - createJobApp (post job details to db)
// get - jobApps
// patch - update job details
// delete job app
