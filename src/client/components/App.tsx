import React from 'react';
import '../../client/styles.css';
import Header from './Header.js';
import JobList from './JobList.js';
import BarChart from './BarChart.js';
import DashboardList from './DashboardList.js';
import NewJobForm from './NewJobForm.js';
import SubmitButton from './SubmitButton.js';




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