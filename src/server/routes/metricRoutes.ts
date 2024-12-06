import express, { Request, Response, NextFunction } from "express";
import metricController from "../controllers/metricController.ts";
const router = express.Router(); 

router.get('/statusCount', metricController.statusCount, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Successful status count', statusCount: res.locals.statusCount })
});


export default router;