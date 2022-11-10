import React from "react";
import { jsx } from "@emotion/react";
import EventIcon from "@mui/icons-material/Event";
import { appConfig } from "config/config";
import JSX = jsx.JSX;

const config = appConfig.calendar.calendars.map(calendar => {
	return {
		name: calendar.name,
		icon: calendar.icon as JSX.Element,
	};
});

export default function CalendarIcon({calendar}: {calendar: string}): JSX.Element{
	const icon = config.find((item) => item.name === calendar).icon;
	return icon ? icon : <EventIcon sx={{color: "#ffffff"}} />;
}
