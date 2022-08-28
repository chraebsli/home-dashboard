import { Day, Month } from "@interfaces/clock";
import { Grid, NoSsr, Stack, Typography } from "@mui/material";
import { addZero } from "@utils/functions";
import React, { useEffect, useState } from "react";

const formatTime = (time: Date) => {
	const hours = addZero(time.getHours());
	const minutes = addZero(time.getMinutes());
	return `${ hours }:${ minutes }`;
};
const formatSeconds = (time: Date) => {
	const seconds = addZero(time.getSeconds());
	return `${ seconds }`;
};

const Clock = ({ size }: { size: number }) => {
	const [ time, setTime ] = useState(new Date());

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
			xs={ size }
			className="clock item"
			sx={ {
				padding: "1rem",
			} }>
			<Stack spacing={ 0 } direction={ "column" }>
				<NoSsr>
					<Stack direction={ "row" }>
						<Typography variant={ "h5" } component={ "span" }>{ `${ Day[time.getDay()] },` }</Typography>
					</Stack>
					<Stack direction={ "row" } spacing={ 0.5 }>
						<Typography variant={ "h5" } component={ "span" }>{ `${ time.getDate() }. ${
							Month[time.getMonth()]
						} ${ time.getFullYear() }` }</Typography>
					</Stack>
					<Stack direction={ "row" }>
						<Typography variant={ "h1" } component={ "span" }>
							{ formatTime(time) }
						</Typography>
						<Typography
							variant={ "h5" }
							component={ "span" }
							sx={ {
								color: "text.secondary",
							} }>
							{ formatSeconds(time) }
						</Typography>
					</Stack>
				</NoSsr>
			</Stack>
		</Grid>
	);
};

export default Clock;
