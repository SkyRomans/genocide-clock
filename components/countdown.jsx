import { useState, useEffect } from 'react';
import { Twemoji } from 'react-emoji-render';

function CountDown() {
    const [targetDate] = useState(new Date('2041-07-01T15:21:11'));
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
                const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));

                setTimeLeft({ years, days });
            } else {
                clearInterval(timer);
                setTimeLeft({ years: 0, days: 0 });
            }
        }, 1);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="relative max-w-md mx-auto">
            <div className="absolute top-0 left-0 right-0 flex justify-center transform -translate-y-1/2 z-10">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Twemoji svg text="🇺🇸" className="mr-2 text-lg" />
                    Minority White Countdown
                </div>
            </div>
            <div className="bg-white text-gray-800 rounded-lg p-3 shadow-md relative">
                <div className="text-lg">
                    {timeLeft.years} years, {timeLeft.days} days
                </div>
            </div>
        </div>
    );
}

export default CountDown;