import { DailyForecast, DailyForecastData } from "@interfaces/weather";
import Config from "@pages/api/weather/owm/config";
import { dailyForecastTestWeatherData } from "@utils/OWMTestWeatherData";
import { NextApiRequest, NextApiResponse } from "next";

const C = Config();
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const response = [];
	for (const location of C.locations) {
		const dayArr: DailyForecastData[] = [];
		const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ location.lat }&lon=${ location.lon }&units=metric&appid=${ C.apiKey }`;
		if (!process.env.NEXT_PUBLIC_API_TEST) {
			await fetch(requestURL)
				.then(data => data.json())
				.then(data => {
					const days = [];
					for (const forecast of data.list) {
						const day = new Date(forecast.dt * 1000).getDay();
						if (!days[day]) days[day] = [];
						const f = {
							date: new Date(forecast.dt * 1000).toISOString(),
							location: location.name,
							temp: {
								min: forecast.main.temp_min,
								max: forecast.main.temp_max,
							},
							weather: forecast.weather[0],
						};
						days[day].push(f);
					}
					return days as DailyForecast[];
				})
				.then(days => {
					days
						.sort((a, b) =>
							new Date(a[0].date).getTime() - new Date(b[0].date).getTime())
						.map(day => {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							const min = Math.min(...day.map(d => d.temp.min));
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							const max = Math.max(...day.map(d => d.temp.max));
							const weather = day[0].weather;
							dayArr.push({
								date: day[0].date,
								temp: { min, max },
								weather: weather,
							} as DailyForecastData);
						});
					dayArr.flat();
				});
			response.push({ location: location.name, forecasts: dayArr });
		} else {
			response.push(dailyForecastTestWeatherData()[location.id]);
		}
	}
	res.status(200).json(response);
};

export default handler;
