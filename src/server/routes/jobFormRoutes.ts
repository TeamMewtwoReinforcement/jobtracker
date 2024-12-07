import express, { Response, Request, NextFunction} from 'express';
import jobFormController from '../controllers/jobform.js'
const router = express.Router();




//JOB APPLICATION SIGN UP // 
router.post('/applicationsignup', jobFormController.createJobApplication, function (req: Request, res: Response, next: NextFunction) {
    return res.status(200).send('job application successfully added')
});


export default router; 