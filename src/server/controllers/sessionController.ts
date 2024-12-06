import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import supabase from '../db/dbconfig.ts'

const sessionController = {
    // Middleware to create a session
    createSession: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = res.locals.user?.session?.access_token;
           
            console.log(res.locals.use)
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

    // verifySession: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
         
    //       const token = req.headers.authorization?.replace('Bearer ', ''); 
    //       if (!token) {
    //         return res.status(401).json({ message: 'no token' }); 
    //       }
      
         
    //       const { data: user, error } = await supabase.auth.getUser(token); 
    //       if (error || !user) {
    //         return res.status(401).json({ message: 'Invalid or expired token' }); 
    //       }
      
    //       //req.user = user; 
      
    //       return res.status(200).json({ message: 'Session is valid', user }); 
    //     } catch (err) {
   
    //       const errObj = {
    //         log: `Session verification failed: ${err}`,
    //         status: 500,
    //         message: { err: "Session verification failed, check server logs for details" },
    //       };
    //       return next(errObj);
    //     }
    //   }


    
}

export default sessionController; 