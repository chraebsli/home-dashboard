import { NextApiRequest, NextApiResponse } from "next";
import { CalendarEvent } from "@interfaces/calendar";
import { addZero } from "@utils/functions";

const formatTime = (time: string) => {
	const date = new Date(time);
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	return `${hours}:${minutes}`;
};
const fullDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const events = await fetch("http://localhost:3000/api/calendar");
	events.json().then((data: CalendarEvent[]) => {
		const event = data.filter((event: CalendarEvent) => {
			const start = new Date(event.start);
			return fullDate(start) === fullDate(new Date());
		})[0];
		event?.summary ? res.status(200).json({
			name: event.summary,
			time: !event.startAllDay ? formatTime(event.start) : null,
			description: event.description,
			location: event.location.split("\\,")[0],
		}) : res.status(200).json({});
	});
};

export default handler;