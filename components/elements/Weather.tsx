import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Location } from "@components/elements/Forecast";
import { CurrentWeatherData } from "@interfaces/weather";
import { addZero, round } from "@utils/functions";
import { appConfig } from "config/config";

const formatDirection = (deg: number) => {
	if (deg > 337.5) return "N";
	if (deg > 292.5) return "NW";
	if (deg > 247.5) return "W";
	if (deg > 202.5) return "SW";
	if (deg > 157.5) return "S";
	if (deg > 122.5) return "SE";
	if (deg > 67.5) return "E";
	if (deg > 22.5) return "NE";
	return "N";
};

const formatTemperature = (weather: CurrentWeatherData) => {
	const {real, feel} = weather.temperature;
	const feelsElement = (
		<Typography variant="h5" component={"span"} sx={{color: "text.secondary"}}>
			/{round(feel, 1)}
		</Typography>
	);
	return (
		<>
			{round(real, 1)}
			{feelsElement}
			°C
		</>
	);
};

const formatSunTime = (weather: CurrentWeatherData, time: "sunrise" | "sunset") => {
	const date = new Date(weather[time] * 1000);
	return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

const calculateRainfall = (weather: CurrentWeatherData): number => weather.rain.lastHour + weather.rain.last3Hours;
const calculateSnowfall = (weather: CurrentWeatherData): number => weather.snow.lastHour + weather.snow.last3Hours;

const Weather = ({size, apiURL, location}: {size: number, apiURL: string, location: Location}) => {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const intervals = appConfig.intervals;
	const weatherService = appConfig.weather.weatherService;

	const getData = () => {
		console.log("Getting current weather data...");
		fetch(`${apiURL}/weather/${weatherService}/current`)
			.then(res => res.json() as Promise<CurrentWeatherData>)
			.then(data => {
				data[0].temperature ? setWeather(data) : null;
				setLoading(false);
			});
	};

	useEffect(() => {
		getData();
		setInterval(() => {
			getData();
		}, intervals.weather);
	}, []);

	//console.log(weather[location]);

	return !loading ? (
		<Grid item xs={size} className="weather item" sx={{padding: "1rem"}}>
			<Stack direction={"column"} spacing={1}>
				<Stack direction={"row"} spacing={2} sx={{justifyContent: "flex-start", gap: "1rem"}}>
					<Stack direction={"row"} spacing={1} sx={{alignItems: "center"}}>
						<img width={30} src={"/i/sunrise.png"} alt={"sunrise icon"} />
						<Typography variant="h6" component="span">
							{weather[location] ? formatSunTime(weather[location], "sunrise") : null}
						</Typography>
					</Stack>
					<Stack direction={"row"} spacing={1} sx={{alignItems: "center"}}>
						<img width={30} src={"/i/sunset.png"} alt={"sunset icon"} />
						<Typography variant="h6" component="span">
							{weather[location] ? formatSunTime(weather[location], "sunset") : null}
						</Typography>
					</Stack>
				</Stack>
				<Stack direction={"row"} spacing={1}>
					<img width={30} src={"/i/temperature.svg"} alt={"temperature icon"} />
					<Typography variant="h4" component="span">
						{weather[location] ? formatTemperature(weather[location]) : null}
					</Typography>
				</Stack>
				<Stack direction={"row"} spacing={2}>
					<Stack direction={"row"} spacing={1}>
						<img width={30} src={"/i/wind.svg"} alt={"wind icon"} />
						<Typography variant="h6" component="span" sx={{color: "text.secondary"}}>
							{formatDirection(weather[location].wind.direction)}
						</Typography>
						<Typography variant="h6" component="span">
							{round(weather[location].wind.speed, 0)} km/h
						</Typography>
					</Stack>
					<Stack direction={"row"} spacing={1}>
						{
							calculateSnowfall(weather[location]) > calculateRainfall(weather[location])
								? (
									<>
										<img width={30} src={"/i/snow.svg"} alt={"snow icon"} />
										<Typography variant="h6" component="span">
											{Math.ceil(calculateSnowfall(weather[location]))} mm
										</Typography>
									</>
								)
								: (
									<>
										<img width={30} src={"/i/rain.svg"} alt={"rain icon"} />
										<Typography variant="h6" component="span">
											{Math.ceil(calculateRainfall(weather[location]))} mm
										</Typography>
									</>
								)
						}
					</Stack>
				</Stack>
			</Stack>
		</Grid>
	) : null;
};

export default Weather;
