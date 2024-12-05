import { Request, Response, NextFunction } from 'express';

const jobController = {

  createJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { company, role, location, flexbility, status, dateApplied, contact } = req.body; 
        // TODO: add sql query to add job details to db 
    } catch (err) {
        const errObj = {
            log: `Error saving job: ${err}`,
            message: { err: "create job failed, check server log for details" },
        };
        return next(errObj);
    }
  }, 

  getAllJobs: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: add functionality 
  },

  updateJob: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: add functionality
  },

  deleteJob: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: add functionality
  }

};

export default jobController;