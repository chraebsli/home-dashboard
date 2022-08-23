import { NextApiRequest, NextApiResponse } from "next";
import { currentTestWeatherData } from "../../../utils/OWMTestWeatherData";

const apiKey = process.env.OWM_API_KEY;
const OWMLocation = {
	name: "Rumisberg",
	country: "CH",
	state: "Bern",
	lat: 47.263451,
	lon: 7.6412018,
};
const OWMRequestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ OWMLocation.lat }&lon=${ OWMLocation.lon }&units=metric&appid=${ apiKey }`;
const handler = async ( _req: NextApiRequest, res: NextApiResponse ) => {
	if ( !process.env.API_TEST ) {
		await fetch( OWMRequestURL )
			.then( data => data.json() )
			.then( data => {
				console.log( data );
				if ( data.cod === "200" ) {
					return {
						code: data.cod,
						message: data.message,
						forecasts: data.list.map( forecast => {
							return {
								date: forecast.dt,
								temperature: {
									temp: forecast.main.temp,
									feels: forecast.main.feels_like,
								},
								weather: {
									name: forecast.weather[ 0 ].main,
									description: forecast.weather[ 0 ].description,
									icon: forecast.weather[ 0 ].icon,
								},
								wind: { ...forecast.wind, },
								clouds: { ...forecast.clouds },
								rain: { ...forecast.rain },
							};
						} ),
						city: { name: data.city.name, sunrise: data.city.sunrise, sunset: data.city.sunset },
						//raw: data,
					};
				} else {
					return {
						code: data.cod,
						message: data.message,
					};
				}
			} )
			.then( data => res.status( 200 ).json( data ) );
	} else{
		res.status(200).json(currentTestWeatherData());
	}
};

export default handler;
