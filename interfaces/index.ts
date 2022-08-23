export type CurrentWeatherData = OWMCurrentWeatherData | AWCurrentWeatherData;

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