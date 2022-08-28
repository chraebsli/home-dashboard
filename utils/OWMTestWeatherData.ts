import { randomFromArray, randomFromRange } from "@utils/functions";

export const currentTestWeatherData = () => {
	return [ {
		description: "Clear",
		icon: "01d",
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
		service: "openweathermap",
		cached: false,
	}, {
		description: "Rain",
		icon: "10d",
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
		service: "openweathermap",
		cached: false,
	} ];
};

export const forecastTestWeatherData = () => {
	return [ {
		code: "200",
		message: 0,
		forecasts: generateTestWeatherForecastData(0),
		city: {
			name: "Wiedlisbach",
		},
		service: "openweathermap",
		cached: false,
	}, {
		code: "200",
		message: 0,
		forecasts: generateTestWeatherForecastData(1),
		city: {
			name: "Bern",
		},
		service: "openweathermap",
		cached: false,
	} ];
};

const generateTestWeatherForecastData = (seed: number) => {
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

const weatherData = [
	{ main: "Clear", description: "clear sky", icon: "01d" },
	{ main: "Clouds", description: "few clouds", icon: "02d" },
	{ main: "Rain", description: "moderate rain", icon: "10d" },
	{ main: "Drizzle", description: "drizzle", icon: "09d" },
	{ main: "Thunderstorm", description: "thunderstorm with light rain", icon: "11d" },
	{ main: "Snow", description: "light snow", icon: "13d" },
	{ main: "Mist", description: "mist", icon: "50d" },
];
