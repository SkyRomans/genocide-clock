'use client'
import { useEffect, useState } from 'react';
import PercentageChart from '../components/percentage_chart';
import CountDown from '../components/countdown';
import Population from '../components/population';

export default function Home() {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    fetch('/US_population.json')
      .then(response => response.json())
      .then(data => {
        // Calculate percentage and add it to each data point
        const processedData = data.map(item => ({
          ...item,
          whitePercentage: (item.white_population / item.total_population) * 100
        }));
        setPopulationData(processedData);
      })
      .catch(error => console.error('Error loading population data:', error));
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-row items-center justify-center gap-4 pb-4'>
        <CountDown populationData={populationData} />
        <Population populationData={populationData} />
      </div>

      <PercentageChart populationData={populationData} />
    </div>
  );
}