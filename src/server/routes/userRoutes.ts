import express, { Request, Response, NextFunction } from "express";
import userController from '../controllers/userController.ts';
import sessionController from '../controllers/sessionController.ts';

const router = express.Router(); 

// signup route handler 
router.post('/signup', userController.createUser, sessionController.createSession, (req: Request, res: Response) => {
  return res.status(201).json({ message: 'User created successfully', user: res.locals.user })
})


// login is commented out in usercontroller now. uncomment this later
// login route handler
router.post('/login', userController.loginUser, sessionController.createSession, (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User logged in successfully', user: res.locals.user })
  })

export default router;