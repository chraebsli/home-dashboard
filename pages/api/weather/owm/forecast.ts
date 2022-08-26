import { forecastTestWeatherData } from "@utils/OWMTestWeatherData";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.OWM_API_KEY;
const location = {
	name: "Rumisberg",
	country: "CH",
	state: "Bern",
	lat: 47.263451,
	lon: 7.6412018,
};

const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ location.lat }&lon=${ location.lon }&units=metric&appid=${ apiKey }`;
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	if (!process.env.NEXT_PUBLIC_API_TEST) {
		await fetch(requestURL)
			.then(data => data.json())
			.then(data => {
				return {
					code: data.cod,
					message: data.message,
					forecasts: data.list.map(forecast => {
						return {
							time: forecast.dt,
							temperature: {
								real: forecast.main.temp,
								feel: forecast.main.feels_like,
							},
							weather: forecast.weather[0],
							wind: {
								speed: forecast.wind.speed,
								direction: forecast.wind.deg,
							},
						};
					}),
					city: { name: data.city.name },

					service: "openweathermap",
					cached: false,
				};
			})
			.then(data => res.status(200).json(data));
	} else {
		res.status(200).json(forecastTestWeatherData());
	}
};

export default handler;
