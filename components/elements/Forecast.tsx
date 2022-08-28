import { ForecastWeatherData, OWMForecast } from "@interfaces/index";
import { Box, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { addZero, round, toFloat } from "@utils/functions";
import React, { useEffect, useState } from "react";

enum Location {
	Wiedlisbach = 0,
	Bern = 1,
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const formatDate = (date: number) => {
	const newDate = new Date(date * 1000);
	return `${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
};

function a11yProps(index: number){
	return {
		id: `simple-tab-${ index }`,
		"aria-controls": `simple-tabpanel-${ index }`,
	};
}

function TabPanel(props: TabPanelProps){
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={ value !== index }
			id={ `simple-tabpanel-${ index }` }
			aria-labelledby={ `simple-tab-${ index }` }
			{ ...other }>
			{ value === index && <Box sx={ { p: 3 } }>{ children }</Box> }
		</Box>
	);
}

const Forecast = ({ size, apiURL }: { size: number, apiURL: string }) => {
	const [ weather, setWeather ] = useState(null);
	const [ currentWeather, setCurrentWeather ] = useState(null);
	const [ location, setLocation ] = useState(Location.Wiedlisbach);

	const getData = () => {
		fetch(`${ apiURL }/weather/${ process.env.NEXT_PUBLIC_WEATHER_SERVICE }/forecast`)
			.then(res => res.json() as Promise<ForecastWeatherData>)
			.then(data => {
				data[0].forecasts ? setWeather(data) : null;
				data[0].forecasts ? setCurrentWeather(data[location]) : null;
			});
	};

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setLocation(newValue);
	};

	useEffect(() => {
		getData();
		setInterval(() => {
			getData();
		}, 1000 * 60 * 60);
	}, [ weather, currentWeather, location ]);

	return (
		<Grid item xs={ size } className="forecast item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 }>
				<Box>
					<Box sx={ { width: "100%" } }>
						<Box sx={ { borderBottom: 1, borderColor: "divider" } }>
							<Tabs
								value={ location }
								onChange={ handleChange }
								aria-label="basic tabs example"
								variant={ "fullWidth" }>
								{ weather?.map((item, index) => (
									<Tab key={ index } label={ item.city.name } { ...a11yProps(index) } />
								)) }
							</Tabs>
						</Box>
						<Divider />
						<TabPanel value={ location } index={ 0 }>
							<ForecastList weather={ weather && weather[Location.Wiedlisbach] } />
						</TabPanel>
						<TabPanel value={ location } index={ 1 }>
							<ForecastList weather={ weather && weather[Location.Bern] } />
						</TabPanel>
					</Box>
				</Box>
			</Stack>
		</Grid>
	);
};

const ForecastList = ({ weather }: { weather: ForecastWeatherData }) => {
	return (
		<Stack direction={ "column" } spacing={ 1 }>
			{ weather?.forecasts.map((forecast: OWMForecast, index) => {
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
			}) }
		</Stack>
	);
};

export default Forecast;