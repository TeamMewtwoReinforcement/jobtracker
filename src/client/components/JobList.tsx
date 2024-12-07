import React, { useEffect, useState, useCallback } from "react";
import SubmitButton from "./SubmitButton.tsx";
import NewJobForm from "./NewJobForm.tsx";
import Modal from "./Modal.tsx";
import LoadingSpinner from "./LoadingSpinner.tsx";
import { FaTrashAlt } from "react-icons/fa";

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
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/job/getAllJobs");
      if (!response.ok) {
        throw new Error(`HTTP ERROR!! Status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      setJobs((prevJobs) => [...prevJobs, createdJob]);
      closeModal();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // const deleteJob = async (jobId: string) => {
  //   try {
  //     const response = await fetch("/job/deleteJob", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ job_id: jobId }),
  //     });
  //     if (!response.ok) throw new Error(`Error: ${response.status}`);
  //     setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // Update local state
  //     console.log("Job deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting job:", error);
  //   }
  // };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="overflow-x-auto mx-auto max-w-6xl px-4 mt-24">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Location Flexibility</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
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
                    {/* <td>
                      <button
                        className="text-grey-500 hover:text-grey-700"
                        onClick={() => deleteJob(job.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    No jobs found. Add an application by clicking the button below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <SubmitButton label="+ Add New Job" handleClick={openModal} />
          </div>
          {showModal && (
            <Modal onClose={closeModal}>
              <NewJobForm onSubmit={createJob} closeModal={closeModal} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default JobList;
