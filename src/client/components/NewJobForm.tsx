import React from "react";
import SubmitButton from "./SubmitButton.tsx";
import { useState, useEffect } from "react";
import { ApplicationDetails } from "./JobList.tsx";

interface NewJobFormProps {
  onSubmit: (newJob: Omit<ApplicationDetails, "id">) => Promise<void>;
  closeModal?: () => void; // Add closeModal function if you're using a modal
}

const NewJobForm: React.FC<NewJobFormProps> = ({onSubmit, closeModal}) => {
  const [formData, setFormData] = useState<Omit<ApplicationDetails, "id">>({
    company_name: '',
    role: '',
    application_status: '',
    date_applied: '',
    location: '',
    location_type: '',
    contact: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const requiredFields = [
      "company",
      "title",
      "location",
      "flexibility",
      "status",
      "dateApplied",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      setErrors(missingFields);
      return false;
    }

    setErrors([]);
    return true;
  };

  //insert new job into db
  // const handleSubmit = async () => {
  //   console.log("in handle submit inside newjobform component");
  //   try {
  //     const response = await fetch("tbd", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("failed to submit form");
  //     }
  //     console.log("new job added");
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed. Missing fields:", errors);
      return;
    }

    try {
      const response = await fetch("/job/createJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form. Status: ${response.status}`);
      }

      console.log("New job successfully added!");
      // Optionally reset the form after successful submission
      setFormData({
        company_name: '',
        role: '',
        application_status: '',
        date_applied: '',
        location: '',
        location_type: '',
        contact: '',
      });
      if (closeModal) {
        closeModal(); // Close the modal after submission
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const inputFields = [
    { name: "company", label: "Company", placeholder: "Dream Company" },
    { name: "title", label: "Title", placeholder: "Dream Role" },
    { name: "location", label: "Location", placeholder: "Ideal City" },
    {
      name: "flexibility",
      label: "Flexibility",
      placeholder: "Hybrid, Remote, or In Person?",
    },
    {
      name: "status",
      label: "Status",
      placeholder: "e.g., Applied, Interviewing",
    },
    {
      name: "dateApplied",
      label: "Date Applied",
      placeholder: "When did you apply?",
    },
    {
      name: "contact",
      label: "Contact",
      placeholder: "Who Do You Know? (Optional)",
    },
  ];

  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      {inputFields.map(({ name, label, placeholder }) => (
        <label
          key={name}
          className="input input-bordered flex items-center gap-2"
        >
          {label}
          <input
            type="text"
            className={`grow ${errors.includes(name) ? "input-error" : ""}`}
            name={name}
            value={formData[name as keyof typeof formData]}
            placeholder={placeholder}
            onChange={handleInputChange}
          />
          {errors.includes(name) && (
            <span className="text-red-500 text-sm">
              This field is required.
            </span>
          )}
        </label>
      ))}
      <div className="text-center mt-4">
        <SubmitButton
          label="Submit"
          handleClick={() =>
            handleSubmit(new Event("submit") as unknown as React.FormEvent)
          }
        />
      </div>
    </form>
  );
};

export default NewJobForm;
