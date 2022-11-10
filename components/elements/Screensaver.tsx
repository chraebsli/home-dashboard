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
const getWeather = async (apiURL) => await fetch(`${ apiURL }/weather/owm/screensaver`).then(res => res.json());

const Screensaver = ({ sleep, resetSleep, apiURL }: { sleep: boolean, resetSleep, apiURL: string }) => {
	const [ date, setDate ] = useState(new Date());
	const [ event, setEvent ] = useState(null);
	const [ weather, setWeather ] = useState(null);

	const getTime = () => `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }`;
	const getDay = () => Day[date.getDay()];
	const getDate = () => `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;

	useEffect(() => {
		getNextEvent(apiURL).then(data => setEvent(data));
		getWeather(apiURL).then(data => setWeather(data));

		setInterval(() => { setDate(new Date()); }, 1000);
		setInterval(async () => { getNextEvent(apiURL).then(data => setEvent(data));}, 1000 * 60);
		setInterval(async () => { getWeather(apiURL).then(data => setWeather(data));}, 1000 * 60 * 5);
		requestWakeLock();
	}, []);

	return sleep && weather ? (
		<Box
			onClick={ () => resetSleep() }
			sx={ { position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh" } }>
			<Stack
				spacing={ 3 }
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
						{ event?.time } { event?.name }
						{ !event.name ? "No events today" : "" }
					</Typography>
					<Typography variant={ "h5" } sx={ { color: "text.secondary", maxWidth: "40vw" } }>
						{ event?.description.substring(0, 140) || event?.location }
					</Typography>
				</Stack>
				<Divider sx={ { width: "30%", height: ".1rem" } } color={ "grey" } />
				<Stack direction={ "row" } alignItems={ "center" }>
					<img width={ 70 } src={ `http://openweathermap.org/img/wn/${ weather.icon }@2x.png` } />
					<Typography variant={ "h4" }>
						{ weather.description }, { weather.temperature }°C
					</Typography>
				</Stack>
			</Stack>
		</Box>
	) : null;
};

export default Screensaver;
