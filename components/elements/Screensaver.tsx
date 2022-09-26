import React, { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Day } from "@interfaces/clock";
import { addZero } from "@utils/functions";

const requestWakeLock = async () => {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const wakeLock = await navigator.wakeLock.request("screen");
		wakeLock.addEventListener("release", () => {
			console.log("Wake Lock was released");
		});
		console.log("Wake Lock is active");
	} catch (err) {
		console.error(`${ err.name }, ${ err.message }`);
	}
};

const getNextEvent = async (apiURL) => await fetch(`${ apiURL }/calendar/next`).then(res => res.json());

const Screensaver = ({ sleep, resetSleep, apiURL }: { sleep: boolean, resetSleep, apiURL: string }) => {
	const [ date, setDate ] = useState(new Date());
	const [ event, setEvent ] = useState(null);

	const getTime = () => `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }`;
	const getDay = () => Day[date.getDay()];
	const getDate = () => `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;

	useEffect(() => {
		setInterval(() => { setDate(new Date()); }, 1000);
		getNextEvent(apiURL).then(data => setEvent(data));
		setInterval(async () => { getNextEvent(apiURL).then(data => setEvent(data));}, 1000 * 60);
		requestWakeLock();
	}, []);

	return sleep && event ? (
		<Box
			onClick={ () => resetSleep() }
			sx={ { position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" } }>
			<Stack
				spacing={ 5 }
				direction={ "column" }
				sx={ { justifyContent: "center", alignItems: "center", height: "100%", width: "100%" } }>
				<Stack direction={ "column" } sx={ { alignItems: "center" } }>
					<Typography variant={ "h1" } component={ "span" } sx={ { fontSize: "7rem" } }>
						{ getTime() }
					</Typography>
					<Typography variant={ "h2" } component={ "span" } sx={ { color: "text.secondary" } }>
						{ `${ getDay() }, ${ getDate() }` }
					</Typography>
				</Stack>
				<Divider sx={ { width: "30%", height: ".1rem" } } color={ "grey" } />
				<Stack direction={ "column" } sx={ { alignItems: "center" } }>
					<Typography variant={ "h4" }>
						{ event.time } { event.name }
					</Typography>
					<Typography variant={ "h5" } sx={ { color: "text.secondary" } }>
						{ event.description || event.location }
					</Typography>
				</Stack>
			</Stack>
		</Box>
	) : null;
};

export default Screensaver;
