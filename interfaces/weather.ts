export type CurrentWeatherData = {
	description: string,
	icon: string,
	temperature: {
		real: number,
		feel: number
	},
	wind: {
		direction: number,
		speed: number
	},
	sunrise: number,
	sunset: number,
	service: "openweathermap",
	cached: boolean
}

export type DailyForecast = {
	location: string,
	forecasts: DailyForecastData[]
}

export type HourlyForecast = {
	code: string,
	message: number | string,
	forecasts: HourlyForecastData[],
	city: {
		name: string,
	},
	service: "openweathermap",
	cached: boolean
}

export type DailyForecastData = {
	date: string;
	temp: {
		min: number;
		max: number;
	},
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}
}

export type HourlyForecastData = {
	time: number,
	temperature: {
		real: number,
		feel: number,
	},
	weather: {
		id: number,
		main: string,
		description: string,
		icon: string
	},
	wind: {
		speed: number,
		direction: number,
	},
}

