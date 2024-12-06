import express, { Request, Response, NextFunction } from "express";
import metricController from "../controllers/metricController.ts";
const router = express.Router(); 

router.get('/interestedStatusCount', metricController.interestedStatusCount, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Successful interested status count', interestedStatusCount: res.locals.interestedStatusCount })
});

// router.get('/appliedStatusCount', metricController.appliedStatusCount, (req: Request, res: Response) => {
//     return res.status(200).json({ message: 'Successful applied status count', appliedStatusCount: res.locals.appliedStatusCount })
// });

// router.get('/interviewedStatusCount', metricController.interviewedStatusCount, (req: Request, res: Response) => {
//     return res.status(200).json({ message: 'Successful interviewed status count', interviewedStatusCount: res.locals.interviewedStatusCount })
// });

// router.get('/offeredStatusCount', metricController.offeredStatusCount, (req: Request, res: Response) => {
//     return res.status(200).json({ message: 'Successful offered status count', offeredStatusCount: res.locals.offeredStatusCount })
// });

// router.get('/rejectedStatusCount', metricController.rejectedStatusCount, (req: Request, res: Response) => {
//     return res.status(200).json({ message: 'Successful rejected status count', rejectedStatusCount: res.locals.rejectedStatusCount })
// });

export default router;