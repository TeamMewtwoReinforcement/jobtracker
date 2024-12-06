import React from "react";
import SubmitButton from "./SubmitButton.tsx";
import { useState, useEffect } from "react";


const NewJobForm: React.FC = () => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    flexibility: "",
    status: "",
    dateApplied: "",
    contact: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formData:", formData);
  };

  //insert new job into db
  const handleSubmit = async () => {
    console.log("in handle submit inside newjobform component");

    const url = "https://localhost:3000/job/applicationsignup"
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("failed to submit form");
      }
      console.log("new job added");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <form className='inputForm' onSubmit={handleSubmit}>
      <label className='input input-bordered flex items-center gap-2'>
        Company
        <input
          type='text'
          className='grow'
          name='company'
          value={formData.company}
          placeholder='Dream Company'
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Title
        <input
          type='text'
          className='grow'
          name='title'
          value={formData.title}
          placeholder='Dream Role'
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Location
        <input
          type='text'
          className='grow'
          name='location'
          value={formData.location}
          placeholder='Ideal City'
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Flexibility
        <input
          type='text'
          className='grow'
          name='flexibility'
          value={formData.flexibility}
          placeholder='Hybrid, Remote, or In Person?'
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Status
        <input
          type='text'
          className='grow'
          name='status'
          value={formData.status}
          placeholder=''
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Date Applied
        <input
          type='text'
          className='grow'
          name='dateApplied'
          value={formData.dateApplied}
          placeholder='When did you apply?'
          onChange={handleInputChange}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Contact
        <input
          type='text'
          className='grow'
          name='contact'
          value={formData.contact}
          placeholder='Who Do You Know?'
          onChange={handleInputChange}
        />
        {/* <span className='badge badge-info'>Optional</span> */}
      </label>
      <div className='text-center mt-4'>
        <SubmitButton label='submit' handleClick={handleSubmit} />
      </div>
    </form>
  );
};

export default NewJobForm;
