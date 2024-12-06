import React from 'react';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import '../styles.css'

ChartJS.register(CategoryScale);

  const BarChart = () => {

    const options = {
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '# of Submitted Applications by Month',
        },
      },
    };

    return (
      <div className= "dataCard">
        <Bar
        //needs to be rendered dynamically from db
          data={{
            labels: ['November', 'December', 'January', 'February'],
            datasets: [
              {
                label: 'Applications',
                data: [20, 30, 40, 15]
              }
            ]
           }} 
           options={options}
           />
      </div>
    )
  }

  export default BarChart;