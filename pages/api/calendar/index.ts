import ICalParser from "ical-js-parser";
import { NextApiRequest, NextApiResponse } from "next";

const sources = [
	// Home Nicholas
	"https://calendar.google.com/calendar/ical/8i9hbp7j7vuhftjinrqijpe7sg%40group.calendar.google.com/private-74c18970f44fcc538a04b77d197d871c/basic.ics",
	// Home Mami
	"https://calendar.google.com/calendar/ical/26impbo2lnk64u4ku0dsrm1r48%40group.calendar.google.com/private-be195c0b6e9b449a07a2fa4243888972/basic.ics",
	// Home Alina
	"https://calendar.google.com/calendar/ical/kj92dc7p10fn4h77lo2j64tfs4%40group.calendar.google.com/private-a6e70d0de291fc879d9746ec87f457c3/basic.ics",
	// Home Ferien
	"https://calendar.google.com/calendar/ical/as80u0po5i728i9nn3t3r5642o%40group.calendar.google.com/private-8965d0cb82df7f6ae9e3348f2e9eb790/basic.ics",
];

const formatDate = (date: string) => {
	const year = date.substring(0, 4);
	const month = date.substring(4, 6);
	const day = date.substring(6, 8);
	if ([ 15, 16 ].includes(date.length)) {
		const hour = date.substring(9, 11);
		const minute = date.substring(11, 13);
		const second = date.substring(13, 15);
		return `${ year }-${ month }-${ day }T${ hour }:${ minute }:${ second }Z`;
	} else if (date.length === 8) {
		return `${ year }-${ month }-${ day }T00:00:00Z`;
	}
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	const events = await Promise.all(sources.map(async (url) => {
			const icsText = await fetch(url).then((r) => r.text());
			const calendar = ICalParser.toJSON(icsText);
			return calendar.events.map((event) => {
				return {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					calendar: calendar.calendar.xWrCalname as string,
					summary: event.summary,
					description: event.description,
					location: event.location,
					startAllDay: event.dtstart.isAllDay,
					start: formatDate(event.dtstart.value),
					endAllDay: event.dtend?.isAllDay,
					end: event.dtend?.value ? formatDate(event.dtend?.value) : null,
					stamp: formatDate(event.dtstamp.value),
					created: formatDate(event.created.value),
					modified: formatDate(event.lastModified?.value),
					id: event.uid,
					rule: event.rrule,
					exdates: event.exdate?.map((exdate) => formatDate(exdate.value)),
					//raw: event,
				};
			});
		}),
	);
	const newEvents = events
		.flat()
		.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
		.filter((event) => new Date(event.end).getTime() > new Date().getTime()
			|| (event.exdates && new Date(event.end).getTime() > new Date().getTime()));

	res.status(200).json(newEvents);
};

export default handler;