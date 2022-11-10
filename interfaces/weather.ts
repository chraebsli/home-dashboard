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
	rain: {lastHour: number, last3Hours: number}
	snow: {lastHour: number, last3Hours: number}
	sunrise: number,
	sunset: number,
}

export type HourlyForecast = {
	location: string,
	forecasts: HourlyForecastData[],
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

export type DailyForecast = {
	location: string,
	forecasts: DailyForecastData[]
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

