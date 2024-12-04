import React, {useEffect, useState } from "react";
import SubmitButton from "./SubmitButton.tsx";
import NewJobForm from "./NewJobForm.tsx";

interface ApplicationDetails {
  id: string;
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
    const [showForm, setShowForm] = useState(false)
    //just for testing purposes. comment out when db call is set up
    const testJobs: ApplicationDetails[] = [{id: '1234', companyName: 'ABC', jobTitle: 'software engineer', location: 'London', flexibility: 'hybrid', status: 'applied', dateApplied: '11.30.2024', contact: 'None'}, {id: '1235', companyName: 'DEF', jobTitle: 'full stack engineer', location: 'Orlando', flexibility: 'remote', status: 'Phone Screen', dateApplied: '11.10.2024', contact: 'None'}]
  
    const addNewJob = () => {
      setShowForm(!showForm);
    };

    useEffect(() => {
      const getJobs = async() => {
        try {
          //for testing purposes. comment in the below for db call
          //const response = await fetch("/jobs") //replace with endpoint
          //const data = await response.json();
          //console.log('returned data from getJobs:', data)
          //setJobs(data);
          setJobs(testJobs) //comment out when db is set up
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
      <SubmitButton label="+ Add New Job" handleClick={addNewJob} />
      {showForm && <NewJobForm />}
    </div>
  );
};

export default JobList;
