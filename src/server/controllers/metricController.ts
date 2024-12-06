import { Request, Response, NextFunction } from "express";
import supabase from "../db/dbconfig.ts";

const metricController = {

  statusCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, status } = req.body;  
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
  }


};

export default metricController; 