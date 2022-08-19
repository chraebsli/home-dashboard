import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.OWM_API_KEY;
const location = {
	name: "Rumisberg",
	country: "CH",
	state: "Bern",
	lat: 47.263451,
	lon: 7.6412018,
};
const OWMRequestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ location.lat }&lon=${ location.lon }&units=metric&appid=${ apiKey }`;

const handler = async ( _req: NextApiRequest, res: NextApiResponse ) => {
	await fetch( OWMRequestURL )
		.then( data => data.json() )
		.then( data => {
			return {
				code: data.cod,
				message: data.message,
				weather: data.list.map( forecast => {
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
				raw: data,
			};
		} )
		.then( data => res.status( 200 ).json( data ) );
};

export default handler;
