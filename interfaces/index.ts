// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
	id: number
	name: string
}

export type WeatherData = {
	code: "200" | string,
	message: string | number,
	forecasts: WeatherForecast[],
	city: { name: string, sunrise: number, sunset: number }
}

export type WeatherForecast = {
	date: number,
	temperature: {
		temp: number,
		feels: number,
	},
	weather: {
		name: string,
		description: string,
		icon: string,
	},
	wind: { speed: number, deg: number, gust: number },
	clouds: { all: number },
	rain: { "3h": number },

}