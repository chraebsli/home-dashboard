import React from "react";

export type AppConfig = {
	weather: WeatherConfig
	calendar: {
		calendars: CalendarConfig[]
	}
	intervals: {
		calendar: number;
		weather: number;
		forecast: number;
	},
	screenTimeout: number;
}

export type WeatherConfig = {
	weatherService: "owm";
	owm: {
		apiKey: string;
		locations: LocationConfig[],
	},
}

export type LocationConfig = {
	id: number;
	name: string;
	country: string;
	state: string;
	lat: number;
	lon: number;
}

export type CalendarConfig = {
	url: string;
	name: string;
	icon: React.ReactNode;
}