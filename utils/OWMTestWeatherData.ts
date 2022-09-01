import {
	CurrentWeatherData,
	DailyForecast,
	DailyForecastData,
	HourlyForecast,
	HourlyForecastData,
} from "@interfaces/weather";
import { randomFromArray, randomFromRange } from "@utils/functions";

export const currentTestWeatherData = (): CurrentWeatherData[] => {
	return [ {
		weather: {
			description: "Clear",
			icon: "01d",
		},
		temperature: {
			real: 23.73,
			feel: 24.47,
		},
		wind: {
			direction: 50,
			speed: 2.06,
		},
		sunrise: 1661229387,
		sunset: 1661279291,
	}, {
		weather: {
			description: "Rain",
			icon: "10d",
		},
		temperature: {
			real: 15.73,
			feel: 15.47,
		},
		wind: {
			direction: 180,
			speed: 8.03,
		},
		sunrise: 1661229387,
		sunset: 1661279291,
	} ];
};

export const hourlyForecastTestWeatherData = (): HourlyForecast[] => {
	return [ {
		forecasts: generateHourlyForecastTestWeatherData(0),
		location: "Wiedlisbach",
	}, {
		forecasts: generateHourlyForecastTestWeatherData(1),
		location: "Bern",
	} ];
};

const generateHourlyForecastTestWeatherData = (seed: number): HourlyForecastData[] => {
	const forecasts = [];
	for (let i = 0; i < 40; i++) {
		const r = randomFromArray(weatherData);
		forecasts.push({
			time: 1661245200 + i * 3600,
			temperature: {
				real: randomFromRange(10, 32) + seed * 3,
				feel: randomFromRange(10, 32) + seed * 3,
			},
			weather: {
				id: 800,
				main: r.main,
				description: r.description,
				icon: r.icon,
			},
			wind: {
				speed: randomFromRange(0, 20) + seed * 3,
				direction: randomFromRange(0, 360) + seed * 3,
			},
		});
	}
	return forecasts;
};

export const dailyForecastTestWeatherData = (): DailyForecast[] => {
	return [ {
		location: "Wiedlisbach",
		forecasts: generateDailyForecastTestWeatherData(0),
	}, {
		location: "Bern",
		forecasts: generateDailyForecastTestWeatherData(1),
	} ];
};

const generateDailyForecastTestWeatherData = (seed: number): DailyForecastData[] => {
	const forecasts = [];
	for (let i = 0; i < 5; i++) {
		const r = randomFromArray(weatherData);
		forecasts.push({
			date: addToDate(new Date(), i * 24 * 1000),
			temp: {
				min: randomFromRange(10, 20) + seed * 3,
				max: randomFromRange(20, 30) + seed * 3,
			},
			weather: {
				id: 800,
				main: r.main,
				description: r.description,
				icon: r.icon,
			},
		});
	}
	return forecasts;
};

const weatherData = [
	{ main: "Clear", description: "clear sky", icon: "01d" },
	{ main: "Clouds", description: "few clouds", icon: "02d" },
	{ main: "Rain", description: "moderate rain", icon: "10d" },
	{ main: "Drizzle", description: "drizzle", icon: "09d" },
	{ main: "Thunderstorm", description: "thunderstorm with light rain", icon: "11d" },
	{ main: "Snow", description: "light snow", icon: "13d" },
	{ main: "Mist", description: "mist", icon: "50d" },
];

const addToDate = (date: Date, hours: number): string => new Date(date.getTime() + hours).toISOString();
