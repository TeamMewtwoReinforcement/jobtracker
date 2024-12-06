// require db 
//import bcrypt from 'bcryptjs'
//import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

import supabase from '../db/dbconfig.ts'

// const JWT_SECRET = process.env.JWT_SECRET;
// const SALT_WORK_FACTOR = 10;


const userController = {
    // Middleware to create a new user
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            // --> Supabase Auth handles pw hashing and storage securely, no need to use bcrypt
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);
            // const pw = await hashPassword(password);
            // TODO: add query to insert username, pw to db 

            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            res.locals.user = data;

            const { data: { user } } = await supabase.auth.getUser()
            console.log('user in create user middle: ',user)

            next();

        } catch (err) {
            const errObj = {
                log: `Create user failed: ${err}`,
                message: { err: "create user failed, check server log for details" },
            };
            return next(errObj);
        }
    }, 
    // Middleware to log in user
    loginUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);
            // // const pw = await hashPassword(password);
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            res.locals.user = data;
            next();

        } catch (err) {
            const errObj = {
                log: `Create user failed: ${err}`,
                message: { err: "create user failed, check server log for details" },
            };
            return next(errObj);
        }  
    }
}


export default userController;