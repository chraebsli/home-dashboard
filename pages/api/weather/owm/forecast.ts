import { HourlyForecast } from "@interfaces/weather";
import Config from "@pages/api/weather/owm/config";
import { hourlyForecastTestWeatherData } from "@utils/OWMTestWeatherData";
import { NextApiRequest, NextApiResponse } from "next";

const C = Config();
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const response = [];
	for (const location of C.locations) {
		const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ location.lat }&lon=${ location.lon }&units=metric&appid=${ C.apiKey }`;
		if (!process.env.NEXT_PUBLIC_API_TEST) {
			await fetch(requestURL)
				.then(data => data.json())
				.then(data => {
					return {
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
						location: data.city.name,
					} as HourlyForecast;
				})
				.then(data => response.push(data));
		} else {
			response.push(hourlyForecastTestWeatherData()[location.id]);
		}
	}
	res.status(200).json(response);
};

export default handler;
