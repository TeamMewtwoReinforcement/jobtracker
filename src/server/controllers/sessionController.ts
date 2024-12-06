import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import supabase from '../db/dbconfig.ts'
import { verify } from "crypto";

const sessionController = {
    // Middleware to create a session
    // createSession: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         console.log('create session')
    //         const token = res.locals.user?.session?.access_token;
           
    //         if (!token) {
    //             return res.status(401).json({ message: 'Missing token'});
    //         }
    //         res.setHeader("Authorization", `Bearer ${token}`);
    //         return next();
    //     } catch (err){
    //         const errObj = {
    //             log: `Token creation failed: ${err}`,
    //             status: 500,
    //             message: { err: "create user failed, check server log for details" },
    //         };
    //         return next(errObj);  
    //     }
    // },

    verifyToken: async (req: Request, res: Response, next: NextFunction) => {

        //console.log('veryfyToken', req.cookies['access_token'])
        const token = req.cookies['access_token'];
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        // Verify the session using the access token
        const { data, error } = await supabase.auth.getUser(token);
    
        if (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        res.locals.user = data.user; 
        //console.log('verfy token res.local.uer is',res.locals.user)
        next();
    }




    
}

export default sessionController; 