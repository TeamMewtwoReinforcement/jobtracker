import React, { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton.tsx";
import NewJobForm from "./NewJobForm.tsx";
import Modal from "./Modal.tsx";

export interface ApplicationDetails {
  id: string;
  company_name: string;
  role: string;
  location?: string;
  location_type?: string;
  application_status: string;
  date_applied: string;
  contact?: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<ApplicationDetails[]>([]);
  // const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal ] = useState(false);

  const addNewJob = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch("/job/getAllJobs") 
        if (!response.ok) {
          throw new Error(`HTTP ERROR!! Status: ${response.status}`)
        }
        const data = await response.json();
        console.log('returned data from getJobs:', data)
        setJobs(data.jobs);
      } catch (error) {
        console.error("error fetching jobs:", error);
      }
    };
    getJobs();
  }, []);

    // Create a new job
    const createJob = async (newJob: Omit<ApplicationDetails, "id">) => {
      try {
        const response = await fetch("/job/createJob", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to create job. Status: ${response.status}`);
        }
  
        const createdJob = await response.json();
        console.log("Job created successfully:", createdJob);
  
        // Update state with the new job
        setJobs((prevJobs) => [...prevJobs, createdJob]);
        closeModal(); // Close the modal after successful creation
      } catch (error) {
        console.error("Error creating job:", error);
      }
    };

    
  return (
    <div className='overflow-x-auto mx-auto max-w-6xl px-4 mt-24'>
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
                <td>{job.company_name}</td>
                <td>{job.role}</td>
                <td>{job.location}</td>
                <td>{job.location_type}</td>
                <td>{job.application_status}</td>
                <td>{job.date_applied}</td>
                <td>{job.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              {/*if no results from query, display 'no jobs found' */}
              <td colSpan={8} className='text-center'>
                No jobs found. Add an application by clicking the button below.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='text-right mt-4'>
        <SubmitButton label='+ Add New Job' handleClick={addNewJob} />
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <NewJobForm onSubmit={createJob} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default JobList;
