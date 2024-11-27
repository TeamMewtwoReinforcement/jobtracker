// require db 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_WORK_FACTOR = 10;

import { Request, Response, NextFunction } from 'express';
const userController = {
    // Middleware to create a new user
    createUser: async (req: Request, res: Response, next: NextFunction ) => {
        async function hashPassword(password: String) {
            const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
            return hashedPassword;
        }
        try {
            const { username, password } = req.body;
            const pw = await hashPassword(password);
            // TODO: add query to insert username, pw to db 
            const createUserQuery = `
            INSERT INTO users `
        } catch (err) {
            const errObj = {
                log: `Create user failed: ${err}`,
                message: { err: "create user failed, check server log for details" },
              };
              return next(errObj);
            }
        }
        // create new user 
        // store new user into reslocals 
    },

    loginUser: async (req: Request, res: Response, next: NextFunction ) => {
        
    }
}

export default userController;