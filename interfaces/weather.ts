export type CurrentWeatherData = {
	weather: {
		description: string,
		icon: string,
	}
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
}

export type DailyForecast = {
	location: string,
	forecasts: DailyForecastData[]
}

export type HourlyForecast = {
	forecasts: HourlyForecastData[],
	location: string,
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

