import { ForecastWeatherData, OWMForecast } from "@interfaces/index";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { addZero, round, toFloat } from "@utils/functions";
import React, { useEffect, useState } from "react";

const formatDate = (date: number) => {
	const newDate = new Date(date * 1000);
	return `${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
};

const Forecast = ({ size, apiURL }: { size: number, apiURL: string }) => {
	const [ weather, setWeather ] = useState(null);

	const getData = () => {
		console.log(process.env.NEXT_PUBLIC_API_URL);
		fetch(`${ apiURL }/weather/${ process.env.NEXT_PUBLIC_WEATHER_SERVICE }/forecast`)
			.then(res => res.json() as Promise<ForecastWeatherData>)
			.then(data => {
				data.forecasts ? setWeather(data) : null;
			});
	};

	useEffect(() => {
		getData();
		setInterval(() => {
			getData();
		}, 1000 * 60 * 60);
	}, []);

	return (
		<Grid item xs={ size } className="forecast item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 }>
				<Box>
					<Typography variant={ "h5" } component={ "span" }>{ weather?.city?.name }</Typography>
					<Divider />
				</Box>
				{
					weather?.forecasts.map((forecast: OWMForecast, index) => {
						return index < 12
							? (
								<Box key={ index } sx={ {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								} }>
									<Typography variant={ "h6" } component={ "span" }>
										{ formatDate(forecast.time) }
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
									<Typography variant={ "h6" }
									            component={ "span" }
									            sx={ { color: "text.secondary" } }>
										{ toFloat(round(forecast.temperature.feel, 1)) }°</Typography>
									<Divider />
								</Box>)
							: null;
					})
				}
			</Stack>
		</Grid>
	);
};

export default Forecast;