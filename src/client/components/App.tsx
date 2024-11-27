import React from 'react';


//By using React.FC, TypeScript automatically infers the type of the component’s props. Do we want to do that?
//Probaby not, but just did it for set up
const App: React.FC = () => {
  
  return (
    <div>
      <h1>Hello Test</h1>
      <p>this is kayla's test. Will this render?</p>
      <p>And another test</p>
      <p>and another - this is rendering</p>
    </div>
  );
};



export default App;