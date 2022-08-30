import ForecastControl from "@components/elements/ForecastControl";
import ForecastList from "@components/elements/ForecastList";
import { DailyForecast, HourlyForecast } from "@interfaces/weather";
import { Box, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

export enum Location {
	Wiedlisbach = 0,
	Bern = 1,
}

export enum FType {
	hourly = 0,
	daily = 1,
}

const Forecast = ({
	size, apiURL, location, setLocation, fType, setFType,
}: {
	size: number, apiURL: string,
	location: Location, setLocation: React.Dispatch<React.SetStateAction<Location>>,
	fType: FType, setFType: React.Dispatch<React.SetStateAction<FType>>,
}) => {
	const [ hourlyWeather, setHourlyWeather ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ dailyWeather, setDailyWeather ] = useState(null);
	const [ dailyLoading, setDailyLoading ] = useState(true);

	const getHourlyForecastData = () => {
		fetch(`${ apiURL }/weather/${ process.env.NEXT_PUBLIC_WEATHER_SERVICE }/forecast`)
			.then(res => res.json() as Promise<HourlyForecast>)
			.then(data => {
				data[0].forecasts ? setHourlyWeather(data) : null;
				setLoading(false);
			});
	};

	const getDailyForecastData = () => {
		fetch(`${ apiURL }/weather/${ process.env.NEXT_PUBLIC_WEATHER_SERVICE }/daily`)
			.then(res => res.json() as Promise<DailyForecast[]>)
			.then(data => {
				data[0].forecasts ? setDailyWeather(data) : null;
				setDailyLoading(false);
			});
	};

	useEffect(() => {
		getHourlyForecastData();
		getDailyForecastData();
		setInterval(() => {
			getHourlyForecastData();
			getDailyForecastData();
		}, 1000 * 60 * 60);
	}, []);

	return !loading && !dailyLoading ? (
		<Grid item xs={ size } className="forecast item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 }>
				<ForecastControl location={ location } setLocation={ setLocation } fType={ fType }
				                 setFType={ setFType } />
				<Divider />
				<Box marginTop="1rem">
					<ForecastList hourlyWeather={ hourlyWeather } dailyWeather={ dailyWeather } location={ location }
					              fType={ fType } />
				</Box>
			</Stack>
		</Grid>

	) : null;
};

export default Forecast;