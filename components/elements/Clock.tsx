import { Grid, Stack, Typography } from "@mui/material";
import { addZero } from "@utils/functions";
import React, { useEffect, useState } from "react";

const formatTime = (time: Date) => {
	const hours = addZero(time.getHours());
	const minutes = addZero(time.getMinutes());
	return `${hours}:${minutes}`;
};
const formatSeconds = (time: Date) => {
	const seconds = addZero(time.getSeconds());
	return `${seconds}`;
};

enum Day {
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
	Sunday = 7,
}

enum Month {
	January = 1,
	February = 2,
	March = 3,
	April = 4,
	May = 5,
	June = 6,
	July = 7,
	August = 8,
	September = 9,
	October = 10,
	November = 11,
	December = 12,
}

const Clock = ({ size }: { size: number }) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Grid
			item
			xs={size}
			className="clock item"
			sx={{
				padding: "1rem",
			}}>
			<Stack spacing={0} direction={"column"}>
				<Stack direction={"row"}>
					<Typography variant={"h5"} component={"span"}>{`${Day[time.getDay()]},`}</Typography>
				</Stack>
				<Stack direction={"row"} spacing={0.5}>
					<Typography variant={"h5"} component={"span"}>{`${time.getDate()}. ${
						Month[time.getMonth()]
					} ${time.getFullYear()}`}</Typography>
				</Stack>
				<Stack direction={"row"}>
					<Typography variant={"h1"} component={"span"}>
						{formatTime(time)}
					</Typography>
					<Typography
						variant={"h5"}
						component={"span"}
						sx={{
							color: "text.secondary",
						}}>
						{formatSeconds(time)}
					</Typography>
				</Stack>
			</Stack>
		</Grid>
	);
};

export default Clock;
