import express, { Request, Response, NextFunction } from "express";
import userController from '../controllers/userController.ts';

const router = express.Router(); 

// signup route handler 
router.post('/signup', userController.createUser, (req: Request, res: Response) => {
  return res.status(200).send('User created');
})

router.get('/pullJobs', userController.pullJobs, (req: Request, res: Response) => {
  console.log(res.locals.jobs)
  return res.status(200).send(res.locals.jobs);
})
// login is commented out in usercontroller now. uncomment this later
// login route handler
// router.get('/login', userController.login, (req: Request, res: Response) => {
//     return res.status(200).send('User logged in')  ;
//   })

export default router;