import { CurrentWeatherData } from "@interfaces/index";
import Config from "@pages/api/weather/owm/config";
import { currentTestWeatherData } from "@utils/OWMTestWeatherData";
import { NextApiRequest, NextApiResponse } from "next";

const C = Config();
const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${ C.location[0].lat }&lon=${ C.location[0].lon }&units=metric&appid=${ C.apiKey }`;
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
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
			.then(data => res.status(200).json(data));
	} else {
		res.status(200).json(currentTestWeatherData());
	}
};

export default handler;
