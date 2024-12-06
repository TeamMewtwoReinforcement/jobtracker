import supabase from "../db/dbconfig.js";
import { Response, Request, NextFunction } from 'express';


const jobFormController = {
    createJobApplication: async (req: Request, res: Response, next: NextFunction) => {

        const { company, title, location, flexibility, status, dateApplied, contact } = req.body;

        try {

            const { data, error } = await supabase
                .from('jobs')
                .insert([{
                    "Company Name": company,
                    "Role": title,
                    "Date Applied": dateApplied,
                    "Application Status": status,
                    "Location": location,
                    "Location Type": flexibility,
                    "Contact": contact
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

