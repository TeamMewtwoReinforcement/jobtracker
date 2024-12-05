import React from "react";


interface SubmitButtonProps {
  label: string;
  handleClick: () => void;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ label, handleClick }) => {

  
  return (
    <button className="btn btn-wide" type='button' onClick={handleClick}>{label}</button>
  )
}

export default SubmitButton;