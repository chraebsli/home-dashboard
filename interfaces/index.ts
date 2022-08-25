export type CurrentWeatherData = OWMCurrentWeatherData | AWCurrentWeatherData;
export type ForecastWeatherData = OWMForecastWeatherData;

export type OWMCurrentWeatherData = {
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

export type AWCurrentWeatherData = {
	description: string,
	icon: number,
	temperature: {
		real: number,
		feel: number
	},
	wind: {
		direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW",
		speed: number
	},
	uvIndex: number,
	precipitation: {
		now: number
	},
	service: "accuweather",
	cached: true

}

export type OWMForecastWeatherData = {
	code: string,
	message: number | string,
	forecasts: OWMForecast[],
	city: {
		name: string,
	},
	service: "openweathermap",
	cached: boolean
}

export type OWMForecast = {
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

export type AWForecastWeatherData = {}
