import React from 'react';
import '../../client/styles.css';
import Header from './Header';
import JobList from './JobList';


//By using React.FC, TypeScript automatically infers the type of the component’s props. Do we want to do that?
//Probaby not, but just did it for set up
const App: React.FC = () => {
  
  return (
    <div>
      <Header />
      <JobList />
    </div>
  );
};



export default App;