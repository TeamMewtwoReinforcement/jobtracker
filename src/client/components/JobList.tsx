import React, {useEffect, useState } from "react";

interface ApplicationDetails {
  id: number;
  companyName: string;
  jobTitle: string;
  location?: string;
  flexibility?: string;
  status: string;
  dateApplied: string;
  contact?: string;
}

const JobList: React.FC = () => {

    const [jobs, setJobs] = useState<ApplicationDetails[]>([]);
  
    useEffect(() => {
      const getJobs = async() => {
        try {
          const response = await fetch("/jobs") //replace with endpoint
          const data = await response.json();
          console.log('returned data from getJobs:', data)
          setJobs(data);
        } catch (error) {
          console.error("error fetching jobs:", error);
        }
      };
      getJobs();
    }, [])

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Flexibility</th>
            <th>Status</th>
            <th>Date Applied</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/*dynamically render each row based on results of db query */}
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={job.id}>
                <th>{index + 1}</th>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>{job.location}</td>
                <td>{job.flexibility}</td>
                <td>{job.status}</td>
                <td>{job.dateApplied}</td>
                <td>{job.contact}</td>
              </tr>
            ))
  ) : (
    <tr>
      {/*if no results from query, display 'no jobs found' */}
      <td colSpan={8} className="text-center">
        No jobs found. Add an application by clicking the button below.
      </td>
    </tr>
  )}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
