import React from "react";

const SubmitButton: React.FC = () => {

  const handleClick = () => {
    //function to handle add new job to table
  }  
  
  return (
    <button className="btn btn-wide" onClick={handleClick}>+  Add New Job</button>
  )
}

export default SubmitButton;