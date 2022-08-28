import { Day } from "@interfaces/clock";
import { Box, Stack, Typography } from "@mui/material";
import { addZero } from "@utils/functions";
import React, { useEffect, useState } from "react";

const Screensaver = ({
	sleep, resetSleep,
}: { sleep: boolean, resetSleep }) => {
	const [ date, setDate ] = useState(new Date());

	const getTime = () => `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }`;
	const getDay = () => Day[date.getDay()];
	const getDate = () => `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;

	useEffect(() => {
		setInterval(() => {
			setDate(new Date());
		}, 1000);
	}, []);

	return sleep ? (
		<Box
			onClick={ () => resetSleep() }
			sx={ {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
			} }>
			<Stack spacing={ 2 } direction={ "column" } sx={ {
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
			} }>
				<Typography variant={ "h1" } component={ "span" } sx={ {
					fontSize: "7rem",
				} }>
					{ getTime() }
				</Typography>
				<Typography variant={ "h2" } component={ "span" } sx={ {
					color: "text.secondary",
				} }>
					{ `${ getDay() }, ${ getDate() }` }
				</Typography>
			</Stack>
		</Box>
	) : null;
};

export default Screensaver;
