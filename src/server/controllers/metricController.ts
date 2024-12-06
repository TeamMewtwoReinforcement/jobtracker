import { Request, Response, NextFunction } from "express";
import supabase from "../db/dbconfig.ts";

const metricController = {

  interestedStatusCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;  
      let { count, error } = await supabase
        .from("jobs")
        .select("*", { count: "exact" , head: true })
        .eq("id", user_id);
      console.log("interested count:", count);
      res.locals.interestedStatusCount = count; 
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