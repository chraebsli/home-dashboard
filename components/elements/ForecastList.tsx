import { FType, Location } from "@components/elements/Forecast";
import { DailyForecast, DailyForecastData, HourlyForecast, HourlyForecastData } from "@interfaces/weather";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { addZero, round, toFloat } from "@utils/functions";
import React from "react";

const formatTime = (date: number) => {
	const newDate = new Date(date * 1000);
	return `${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
};
const formatDate = (date: string) => {
	const newDate = new Date(date);
	return `${ addZero(newDate.getDate()) }.${ addZero(newDate.getMonth() + 1) }`;
};

const ForecastList = ({
	hourlyWeather, dailyWeather, location, fType,
}: {
	hourlyWeather: HourlyForecast, dailyWeather: DailyForecast, location: Location, fType: FType,
}) => {

	if (location === Location.Wiedlisbach && fType === FType.hourly) {
		return <HourlyForecastList hourlyWeather={ hourlyWeather && hourlyWeather[Location.Wiedlisbach] } />;
	} else if (location === Location.Wiedlisbach && fType === FType.daily) {
		return <DailyForecastList dailyWeather={ dailyWeather && dailyWeather[Location.Wiedlisbach] } />;
	} else if (location === Location.Bern && fType === FType.hourly) {
		return <HourlyForecastList hourlyWeather={ hourlyWeather && hourlyWeather[Location.Bern] } />;
	} else if (location === Location.Bern && fType === FType.daily) {
		return <DailyForecastList dailyWeather={ dailyWeather && dailyWeather[Location.Bern] } />;
	}
};

const HourlyForecastList = ({ hourlyWeather }: { hourlyWeather: HourlyForecast }) => {
	return (
		<Stack className={ "forecast-list" } direction={ "column" } spacing={ 1 }
			sx={ {
				maxHeight: "30rem",
			} }>
			{ hourlyWeather?.forecasts.map((forecast: HourlyForecastData, index) => {
				return index < 20
					? (
						<Box key={ index } sx={ {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						} }>
							<Typography variant={ "h6" } component={ "span" }>
								{ formatTime(forecast.time) }
							</Typography>
							<img width={ 40 } style={ {
								backgroundColor: "#b4b4b4",
								borderRadius: "50%",
							} }
								src={ `http://openweathermap.org/img/wn/${ forecast.weather.icon }@2x.png` }
								alt={ forecast.weather.description } />
							<Typography variant={ "h6" } component={ "span" }>
								{ toFloat(round(forecast.temperature.real, 1)) }°
							</Typography>
							<Typography variant={ "h6" } component={ "span" } sx={ { color: "text.secondary" } }>
								{ toFloat(round(forecast.temperature.feel, 1)) }°</Typography>
							<Divider />
						</Box>)
					: null;
			}) }
		</Stack>
	);
};

const DailyForecastList = ({ dailyWeather }: { dailyWeather: DailyForecast }) => {
	return (
		<Stack className={ "calendar-list" } direction={ "column" } spacing={ 1 }>
			{ dailyWeather.forecasts.map((forecast: DailyForecastData, index) => {
				return index < 10
					? (
						<Box key={ index } sx={ {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						} }>
							<Typography variant={ "h6" } component={ "span" }>
								{ formatDate(forecast.date) }
							</Typography>
							<img width={ 40 } style={ {
								backgroundColor: "#b4b4b4",
								borderRadius: "50%",
							} }
								src={ `http://openweathermap.org/img/wn/${ forecast.weather.icon }@2x.png` }
								alt={ forecast.weather.description } />
							<Typography variant={ "h6" } component={ "span" }>
								{ toFloat(round(forecast.temp.max, 1)) }°
							</Typography>
							<Typography variant={ "h6" } component={ "span" } sx={ { color: "text.secondary" } }>
								{ toFloat(round(forecast.temp.min, 1)) }°</Typography>
							<Divider />
						</Box>)
					: null;
			}) }
		</Stack>
	);
};

export default ForecastList;