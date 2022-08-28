import Config from "@pages/api/weather/owm/config";
import { forecastTestWeatherData } from "@utils/OWMTestWeatherData";
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
				.then(data => response.push(data));
		} else {
			response.push(forecastTestWeatherData());
		}
	}
	res.status(200).json(response);
};

export default handler;
