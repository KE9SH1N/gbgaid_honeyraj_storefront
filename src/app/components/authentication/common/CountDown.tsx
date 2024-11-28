import React, { useEffect, useState } from "react";

interface CountDownProps {
	targetDate: string;
	onExpire: () => void;
}

const CountDown: React.FC<CountDownProps> = ({ targetDate, onExpire }) => {
	const [timeLeft, setTimeLeft] = useState<number>(0);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		const updateCountdown = () => {
			const target = new Date(targetDate).getTime();
			const now = new Date().getTime();
			const distance = target - now;

			if (distance <= 0) {
				setTimeLeft(0);
				onExpire();
				clearInterval(intervalId);
			} else {
				setTimeLeft(distance);
			}
		};

		if (targetDate) {
			updateCountdown();
			intervalId = setInterval(updateCountdown, 1000);
			return () => clearInterval(intervalId);
		}
	}, [targetDate, onExpire]); // Add onExpire to the dependencies array

	const formatTime = (time: number) => {
		const hours = Math.floor(time / (1000 * 60 * 60));
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((time % (1000 * 60)) / 1000);
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<div>
			<span className="font-semibold">{formatTime(timeLeft)}</span>
		</div>
	);
};

export default CountDown;
