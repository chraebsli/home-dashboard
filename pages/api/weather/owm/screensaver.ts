import { NextApiRequest, NextApiResponse } from "next";
import { CurrentWeatherData } from "@interfaces/weather";
import { round } from "@utils/functions";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const weather = await fetch("http://localhost:3000/api/weather/owm/current");
	weather.json().then((data: CurrentWeatherData[]) => {
		const actual = data[0];
		res.status(200).json({
			icon: actual.weather.icon,
			description: actual.weather.description,
			temperature: round(actual.temperature.real, 0),
		});
	});
};

export default handler;
