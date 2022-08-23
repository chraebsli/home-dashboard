import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { CurrentWeatherData } from "@interfaces/index";
import { addZero, round } from "@utils/functions";

const formatTemperature = ( weather: CurrentWeatherData ) => {
	const { real, feel } = weather.temperature;
	const feelsElement = <Typography variant="h5"
	                                 component={ "span" }
	                                 sx={ { color: "text.secondary" } }>/{ round( feel, 1 ) }</Typography>;
	return (
		<>
			{ round( real, 1 ) }
			{ feelsElement }
			°C
		</>
	);
};

const formatSunTime = ( weather: CurrentWeatherData, time: "sunrise" | "sunset" ) => {
	const date = new Date( weather[ time ]*1000 );
	console.log( date );
	return `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }`;
};

const Weather = ( { size }: { size: number } ) => {
	const [ weather, setWeather ] = useState( null );

	const getData = () => {
		fetch( `http://localhost:3000/api/weather/${ process.env.NEXT_PUBLIC_WEATHER_SERVICE }/current` )
			.then( res => res.json() as Promise<CurrentWeatherData> )
			.then( data => {
				data.temperature ? setWeather( data ) : null;
			} );
	};

	useEffect( () => {
		getData();
		setInterval( () => {
			getData();
		}, 1000 * 60 * 60 );
	}, [] );

	return (
		<Grid item xs={ size } className="weather item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 }>
				<Stack direction={ "row" } spacing={ 2 } sx={ {
					justifyContent: "space-around"
				} }>
					<Stack direction={ "row" } spacing={ 1 } sx={ {
						alignItems: "center"
					} }>
						<img width={ 30 } src={ "/i/sunrise.png" } />
						<Typography variant="h6"
						            component="span">{ weather ? formatSunTime( weather, "sunrise" ) : null }</Typography>
					</Stack>
					<Stack direction={ "row" } spacing={ 1 } sx={ {
						alignItems: "center"
					} }>
						<img width={ 30 } src={ "/i/sunset.png" } />
						<Typography variant="h6"
						            component="span">{ weather ? formatSunTime( weather, "sunset" ) : null }</Typography>
					</Stack>
				</Stack>
				<Stack direction={ "row" } spacing={ 1 }>
					<img width={ 30 } src={ "/i/temperature.svg" } />
					<Typography variant="h4"
					            component="span">{ weather ? formatTemperature( weather ) : null }</Typography>
				</Stack>
			</Stack>
		</Grid>
	);
};

export default Weather;