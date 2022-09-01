import { NextApiRequest, NextApiResponse } from "next";
import Config from "./config";
import { CurrentWeatherData } from "@interfaces/weather";
import { currentTestWeatherData } from "@utils/TestWeatherData";

const C = Config();
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const response = [];
	for (const location of C.locations) {
		const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${ location.lat }&lon=${ location.lon }&units=metric&appid=${ C.apiKey }`;
		if (!process.env.NEXT_PUBLIC_API_TEST) {
			await fetch(requestURL)
				.then(data => data.json())
				.then(data => {
					return {
						weather: {
							description: data.weather[0].main,
							icon: data.weather[0].icon,
						},
						temperature: {
							real: data.main.temp,
							feel: data.main.feels_like,
						},
						wind: {
							direction: data.wind.deg,
							speed: data.wind.speed,
						},
						rain: {
							lastHour: data.rain ? data.rain["1h"] : 0,
							last3Hours: data.rain ? data.rain["3h"] : 0,
						},
						snow: {
							lastHour: data.snow ? data.snow["1h"] : 0,
							last3Hours: data.snow ? data.snow["3h"] : 0,
						},
						sunrise: data.sys.sunrise,
						sunset: data.sys.sunset,
					} as CurrentWeatherData;
				})
				.then(data => response.push(data));
		} else {
			response.push(currentTestWeatherData()[location.id]);
		}
	}
	res.status(200).json(response);
};

export default handler;
