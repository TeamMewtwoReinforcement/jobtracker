import React from "react";


interface SubmitButtonProps {
  label: string;
  handleClick: () => void;
  className?: string
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ label, className ='', handleClick }) => {

  
  return (
    <button className={`btn btn-wide ${className}`} type='button' onClick={handleClick}>{label}</button>
  )
}

export default SubmitButton;