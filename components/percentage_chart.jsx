'use client'

import { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

function PercentageChart({ populationData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartElement = chartRef.current;
        if (chartElement) {
            let startX;

            const handleTouchStart = (e) => {
                startX = e.touches[0].clientX;
            };

            const handleTouchMove = (e) => {
                if (startX) {
                    const currentX = e.touches[0].clientX;
                    const diff = startX - currentX;
                    if (Math.abs(diff) > 5) {
                        e.preventDefault();
                    }
                }
            };

            chartElement.addEventListener('touchstart', handleTouchStart, { passive: false });
            chartElement.addEventListener('touchmove', handleTouchMove, { passive: false });

            return () => {
                chartElement.removeEventListener('touchstart', handleTouchStart);
                chartElement.removeEventListener('touchmove', handleTouchMove);
            };
        }
    }, []);

    return (
        <div ref={chartRef} className='w-full h-[400px] bg-black bg-opacity-60 rounded-xl chart-container'>
            {populationData ? (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={populationData}
                        margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                        stackOffset="expand"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                        <XAxis
                            dataKey="year"
                            scale="time"
                            type="number"
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => new Date(value, 0).getFullYear()}
                            ticks={[1850, 1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060]}
                        />
                        <YAxis
                            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <Tooltip
                            labelFormatter={(value) => `Year: ${value}`}
                            formatter={(value, name, entry) => {
                                let total;
                                if (entry.payload.white_population !== undefined) {
                                    // Use actual data
                                    total = entry.payload.white_population + entry.payload.non_white_population;
                                } else {
                                    // Use projected data
                                    total = entry.payload.projected_white_population + entry.payload.projected_non_white_population;
                                }
                                const percentage = total > 0 ? (value / total * 100).toFixed(2) : '0.00';
                                return [`${Number(value).toLocaleString()} (${percentage}%)`, name];
                            }}
                            contentStyle={{
                                color: 'black',
                                backgroundColor: 'white',
                                border: '1px solid #cccccc'
                            }}
                            itemStyle={{ color: 'black' }}
                            labelStyle={{ color: 'black' }}
                        />
                        <Legend
                            payload={[
                                { value: 'White Population %', type: 'square', color: '#ffffff' }
                            ]}
                        />
                        <ReferenceLine
                            x={1945}
                            stroke="red"
                            strokeDasharray="3 3"
                            label={{
                                value: 'WW2 Ends',
                                position: 'top',
                                fill: 'red',
                                fontSize: 14,
                                fontWeight: 'bold',
                                dy: -3
                            }}
                        />
                        <ReferenceLine
                            x={1965}
                            stroke="green"
                            strokeDasharray="3 3"
                            label={{
                                value: '1965 Immigration Act',
                                position: 'top',
                                fill: 'green',
                                fontSize: 14,
                                fontWeight: 'bold',
                                dy: -20
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="white_population"
                            stackId="1"
                            stroke="#ffffff"
                            fill="#ffffff"
                            name="White Population"
                        />
                        <Area
                            type="monotone"
                            dataKey="non_white_population"
                            stackId="1"
                            stroke="#8B4513"
                            fill="#8B4513"
                            name="Non-White Population"
                        />
                        <Area
                            type="monotone"
                            dataKey="projected_white_population"
                            stackId="1"
                            stroke="#ffffff"
                            fill="url(#projectedWhite)"
                            name="Projected White Population"
                        />
                        <Area
                            type="monotone"
                            dataKey="projected_non_white_population"
                            stackId="1"
                            stroke="#8B4513"
                            fill="url(#projectedNonWhite)"
                            name="Projected Non-White Population"
                        />
                        <defs>
                            <pattern id="projectedWhite" patternUnits="userSpaceOnUse" width="4" height="4">
                                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#ffffff', strokeWidth: 1 }} />
                            </pattern>
                            <pattern id="projectedNonWhite" patternUnits="userSpaceOnUse" width="4" height="4">
                                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#8B4513', strokeWidth: 1 }} />
                            </pattern>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default PercentageChart;
