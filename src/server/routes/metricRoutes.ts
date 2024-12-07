import express, { Request, Response, NextFunction } from "express";
import metricController from "../controllers/metricController.ts";
const router = express.Router(); 

// dynamic router handler to return count of requested status 
// router.get('/statusCount', metricController.statusCount, (req: Request, res: Response) => {
//     console.log("res: ", res);
//     return res.status(200).json({ message: 'Successful status count', statusCount: res.locals.statusCount })
// });

router.get('/statusCount/', metricController.statusCount, (req: Request, res: Response) => {
    console.log("res: ", res);
    return res.status(200).json({ message: 'Successful status count', statusCount: res.locals.statusCount })
});


router.get('/statusCountTest', metricController.statusCountRPC, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Successful status count', statusCount: res.locals.statusCount })
});

// router.get('/statusCount', metricController.interestedCount, (req: Request, res: Response) => {
//     console.log("res: ", res);
//     return res.status(200).json({ message: 'Successful status count', interestedCount: res.locals.statusCount })
// });

// router.get('/statusCount', metricController.appliedCount, (req: Request, res: Response) => {
//     console.log("res: ", res);
//     return res.status(200).json({ message: 'Successful status count', appliedCount: res.locals.statusCount })
// });

// router.get('/statusCount', metricController.interestedCount, (req: Request, res: Response) => {
//     console.log("res: ", res);
//     return res.status(200).json({ message: 'Successful status count', interestedCount: res.locals.statusCount })
// });

// router.get('/statusCount', metricController.interestedCount, (req: Request, res: Response) => {
//     console.log("res: ", res);
//     return res.status(200).json({ message: 'Successful status count', interestedCount: res.locals.statusCount })
// });


export default router;