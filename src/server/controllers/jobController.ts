import { Request, Response, NextFunction } from "express";
import supabase from "../db/dbconfig.ts";

const jobController = {
  createJob: async (req: Request, res: Response, next: NextFunction) => {
    const {
      user_id = "cd6fc064-2539-4ab6-b70a-47bbd729cac9",
      company,
      title,
      location,
      flexibility,
      status,
      dateApplied,
      contact,
    } = req.body;

    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([
          {
            id: user_id,
            company_name: company,
            role: title,
            date_applied: dateApplied,
            application_status: status,
            location: location,
            location_type: flexibility,
            contact: contact,
          },
        ])
        .select();

      // Check if there was an error
      if (error) {
        console.error("Supabase insert error:", error); // Log the error
        throw new Error(error.message); // Optionally, throw an error to the next middleware
      }

      console.log("insert data", data);
      next();
    } catch (err: any) {
      const errObj = {
        log: `create job controller: ${err}`,
        message: { err: "Error in createJob Controller" },
      };
      return next(errObj);
    }
  },

  getAllJobs: async (req: Request, res: Response, next: NextFunction) => {
    // const { user_id } = req.body;
    // static for now, use req body later for dynamic
    const user_id = "cd6fc064-2539-4ab6-b70a-47bbd729cac9";
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", user_id);
    console.log("jobs in controller: ", jobs);
    res.locals.jobs = jobs;
    return next();
  },

  updateJob: async (req: Request, res: Response, next: NextFunction) => {
    const {
      job_id,
      user_id,
      company,
      title,
      location,
      flexibility,
      status,
      dateApplied,
      contact,
    } = req.body;
    let { data: job, error } = await supabase
      .from("jobs")
      .update({
        id: user_id,
        company_name: company,
        role: title,
        date_applied: dateApplied,
        application_status: status,
        location: location,
        location_type: flexibility,
        contact: contact,
      })
      .eq("job_id", job_id);
    res.locals.job = job;
    return next();
  },

  deleteJob: async (req: Request, res: Response, next: NextFunction) => {
    const { job_id } = req.body;
    let { data: job, error } = await supabase
      .from("jobs")
      .delete()
      .eq("job_id", job_id);
    res.locals.job = job;
    return next();
  },
};

export default jobController;
