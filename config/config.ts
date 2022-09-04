import { AppConfig } from "@interfaces/config";
import { Calendars } from "config/calendars";
import { Locations } from "config/locations";

export const appConfig: AppConfig = {
	weather: {
		weatherService: "owm",
		owm: {
			apiKey: process.env.OWM_API_KEY || "",
			locations: Locations,
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
