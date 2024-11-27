import express, { Request, Response, NextFunction } from "express";
import userController from '../controllers/userController.ts';

const router = express.Router(); 

// signup route handler 
router.post('/signup', userController.createUser, (req: Request, res: Response) => {
  return res.status(200).send('User created')  ;
})

// login route handler
router.post('/login', userController.login, (req: Request, res: Response) => {
    return res.status(200).send('User logged in')  ;
  })