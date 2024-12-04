import supabase from "../db/dbconfig.js";
import { Response, Request, NextFunction } from 'express';


const jobFormController = {
    createJobApplication: async (req: Request, res: Response, next: NextFunction) => {

        const { userid, company, jobtitle, status, dateapplied, } = req.body;

        try {

            const { data, error } = await supabase
                .from('jobs')
                .insert([{
                    "id": uuidv4(),
                    "Company Name": 'Facebook',
                    "Role": 'L5',
                    "Date Applied": 'December 2, 2024',
                    "Application Status": 'Applied',
                    "Location": 'New York',
                    "Location Type": 'Hybrid',
                    "Contact": 'Sally'
                }],)
                .select()

            // Check if there was an error
            if (error) {
                console.error("Supabase insert error:", error); // Log the error
                throw new Error(error.message); // Optionally, throw an error to the next middleware
            }

            console.log('insert data', data);
            next();


        } catch (err: any) {
            const errObj = {
                log: `create job application controller: ${err}`,
                message: { err: "Error in createJobApplication Controller" },
            };
            return next(errObj);
        }


    }
}


export default jobFormController;

