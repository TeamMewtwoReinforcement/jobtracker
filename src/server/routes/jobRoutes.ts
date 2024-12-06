import express, { Request, Response, NextFunction } from "express";
import jobController from "../controllers/jobController.ts";
const router = express.Router(); 

// Posting job app to db 
router.post('/createJob', jobController.createJob, (req: Request, res: Response) => {
    return res.status(201).json({ message: 'Job created successfully', job: res.locals.job })
});

router.get('/getAllJobs', jobController.getAllJobs, (req: Request, res: Response) => {
    return res.status(200).json({ jobs: res.locals.jobs })
});

router.patch('/updateJob', jobController.updateJob, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Job updated successfully', job: res.locals.job })
});

router.delete('/deleteJob', jobController.deleteJob, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Job deleted', job: res.locals.job })
});

export default router; 