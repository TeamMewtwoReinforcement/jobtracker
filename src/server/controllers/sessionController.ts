import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import supabase from '../db/dbconfig.ts'

const sessionController = {
// Middleware to create a session
    createSession: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = res.locals.user?.session?.access_token;
            if (!token) {
                return res.status(401).json({ message: 'Missing token'});
            }
            res.setHeader("Authorization", `Bearer ${token}`);
            return next();
        } catch (err){
            const errObj = {
                log: `Token creation failed: ${err}`,
                status: 500,
                message: { err: "create user failed, check server log for details" },
            };
            return next(errObj);  
        }
    }
}

export default sessionController; 