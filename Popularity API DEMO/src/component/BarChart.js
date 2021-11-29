import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  options: {
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  }
  
};
function BarChart(props) {
 const {dataSet} = props;
  return (
    <>
        <Bar className="mb-4"
        options = {
          options
        }
        data = {
         dataSet          
        }
        />
    </>
  )
}

export default BarChart
