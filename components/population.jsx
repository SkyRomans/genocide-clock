import { useState, useEffect, useRef } from 'react';
import { Twemoji } from 'react-emoji-render';

function Population({ populationData }) {
    const [currentWhitePopulation, setCurrentWhitePopulation] = useState(null);
    const [growthRate, setGrowthRate] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (populationData && populationData.length > 1) {
            const currentYear = new Date().getFullYear();
            const lastDataPoint = populationData[populationData.length - 1];
            const secondLastDataPoint = populationData[populationData.length - 2];

            const yearDiff = currentYear - lastDataPoint.year;
            const populationDiff = lastDataPoint.white_population - secondLastDataPoint.white_population;
            const yearsBetweenDataPoints = lastDataPoint.year - secondLastDataPoint.year;
            const annualChange = populationDiff / yearsBetweenDataPoints;

            const interpolatedPopulation = lastDataPoint.white_population + (annualChange * yearDiff);
            setCurrentWhitePopulation(Math.round(interpolatedPopulation));

            const rate = (annualChange / secondLastDataPoint.white_population) * 100;
            setGrowthRate(rate);

            // Start the simulation
            startSimulation(Math.round(interpolatedPopulation), rate);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [populationData]);

    const startSimulation = (initialPopulation, annualRate) => {
        const secondsInYear = 365 * 24 * 60 * 60;
        const growthPerSecond = annualRate / 100 / secondsInYear;

        intervalRef.current = setInterval(() => {
            setCurrentWhitePopulation(prevPopulation => {
                const randomFactor = 1 + (Math.random() * 0.002 - 0.001); // ±0.1% randomness
                const change = prevPopulation * growthPerSecond * randomFactor;
                return Math.round(prevPopulation + change);
            });
        }, 1000); // Update every second
    };

    // Add this useEffect to force re-render
    useEffect(() => {
        const forceUpdateInterval = setInterval(() => {
            setCurrentWhitePopulation(prev => prev);
        }, 1000);

        return () => clearInterval(forceUpdateInterval);
    }, []);

    return (
        <div className="relative max-w-md mx-auto">
            <div className="absolute top-0 left-0 right-0 flex justify-center transform -translate-y-1/2 z-10">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    White Population
                </div>
            </div>
            <div className="bg-white text-gray-800 rounded-lg p-3 shadow-md relative">
                <div className="text-lg">
                    {currentWhitePopulation ? (
                        <p>{currentWhitePopulation.toLocaleString()}</p>
                    ) : (
                        <p>Loading population data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Population;