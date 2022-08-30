import { CurrentWeatherData } from "@interfaces/weather";
import Config from "@pages/api/weather/owm/config";
import { currentTestWeatherData } from "@utils/OWMTestWeatherData";
import { NextApiRequest, NextApiResponse } from "next";

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
						description: data.weather[0].main,
						icon: data.weather[0].icon,
						temperature: {
							real: data.main.temp,
							feel: data.main.feels_like,
						},
						wind: {
							direction: data.wind.deg,
							speed: data.wind.speed,
						},
						sunrise: data.sys.sunrise,
						sunset: data.sys.sunset,

						service: "openweathermap",
						cached: false,

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
