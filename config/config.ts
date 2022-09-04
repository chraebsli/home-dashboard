import React from "react";
import { Calendars } from "config/calendars";

export const appConfig: AppConfig = {
	weather: {
		weatherService: "owm",
		owm: {
			apiKey: process.env.OWM_API_KEY || "",
			locations: [
				{
					id: 0,
					name: "Wiedlisbach",
					country: "CH",
					state: "Bern",
					lat: 47.263451,
					lon: 7.6412018,
				},
				{
					id: 1,
					name: "Bern",
					state: "Bern",
					country: "CH",
					lat: 46.9482713,
					lon: 7.4514512,
				},
			],
		},
	},
	calendar: {
		calendars: Calendars,
	},
	intervals: {
		calendar: 30 * 1000,
		weather: 15 * 60 * 1000,
		forecast: 60 * 60 * 1000,
	},
	screenTimeout: 60 * 15 * 1000,
};

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
		locations: {
			id: number;
			name: string;
			country: string;
			state: string;
			lat: number;
			lon: number;
		}[],
	},
}
export type CalendarConfig = {
	url: string;
	name: string;
	icon: React.ReactNode;
}