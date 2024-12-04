import React from 'react';
import '../../client/styles.css';
import Header from './Header.tsx';
import JobList from './JobList.tsx';
import BarChart from './BarChart.js';
import DashboardList from './DashboardList.tsx';
import NewJobForm from './NewJobForm.tsx';
import SubmitButton from './SubmitButton.tsx';




//By using React.FC, TypeScript automatically infers the type of the component’s props. Do we want to do that?
//Probaby not, but just did it for set up
const App: React.FC = () => {
  
  return (
    <div>
      <Header />
      <JobList />
      <BarChart />
      <NewJobForm />
    </div>
  );
};



export default App;