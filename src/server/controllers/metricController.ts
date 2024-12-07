import { Request, Response, NextFunction } from "express";
import supabase from "../db/dbconfig.ts";

const metricController = {

  statusCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, status } = req.query;  
      let { count, error } = await supabase
        .from("jobs")
        .select("*", { count: "exact" , head: true })
        .eq("id", user_id)
        .eq("application_status", status);
      console.log(`${status} count: ${count}`);
      res.locals.statusCount = count; 
      return next();   

    } catch (err: any) {
        const errObj = {
            log: `Error fetching interested status count: ${err}`,
            message: { err: "Error in interestedStatusCount middleware func" },
          };
          return next(errObj);
    }
  },

  statusCountRPC: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;  
      let { data, error } = await supabase
      .rpc('custom_sql_query', { query: `
        SELECT 
          COUNT(CASE WHEN application_status = 'Interested' THEN 1 END) AS interested_status,
          COUNT(CASE WHEN application_status = 'Applied' THEN 1 END) AS applied_status,
          COUNT(CASE WHEN application_status = 'Interviewing' THEN 1 END) AS interviewing_status,
          COUNT(CASE WHEN application_status = 'Offer' THEN 1 END) AS offer_status,
          COUNT(CASE WHEN application_status = 'Rejected' THEN 1 END) AS rejected_status
        FROM jobs
        WHERE id = ${user_id};
      ` });  
      console.log(`Status Counts: ${data}`);  
      res.locals.statusCount = data; 
      return next();   

    } catch (err: any) {
        const errObj = {
            log: `Error fetching interested status count: ${err}`,
            message: { err: "Error in interestedStatusCount middleware func" },
          };
          return next(errObj);
    }
  }


};

export default metricController; 