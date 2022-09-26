import { NextApiRequest, NextApiResponse } from "next";
import { CalendarEvent } from "@interfaces/calendar";
import { addZero } from "@utils/functions";

const formatTime = (time: string) => {
	const date = new Date(time);
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	return `${ hours }:${ minutes }`;
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const events = await fetch("http://localhost:3000/api/calendar");
	events.json().then((data: CalendarEvent[]) => {
		const event = data.filter((event: CalendarEvent) => {
			const start = new Date(event.start);
			return start >= new Date()
				&& start < new Date(start.getTime() + 1000 * 60 * 60 * 24);
		})[0];
		res.status(200).json({
			name: event.summary,
			time: formatTime(event.start),
			description: event.description,
			location: event.location.split("\\,")[0],
		});
	});
};

export default handler;