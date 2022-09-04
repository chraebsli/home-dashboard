import { CalendarEvent } from "@interfaces/calendar";
import ICalParser from "ical-js-parser";
import { NextApiRequest, NextApiResponse } from "next";
import { appConfig } from "config/config";

const sources = appConfig.calendar.calendars.map((calendar) => calendar.url);

enum Day {
	Monday = 0,
	Tuesday = 1,
	Wednesday = 2,
	Thursday = 3,
	Friday = 4,
	Saturday = 5,
	Sunday = 6
}

enum Day2 {
	"mo" = Day.Monday,
	"tu" = Day.Tuesday,
	"we" = Day.Wednesday,
	"th" = Day.Thursday,
	"fr" = Day.Friday,
	"sa" = Day.Saturday,
	"su" = Day.Sunday,
}

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
const formatISODate = (date: string) => {
	const year = date.substring(0, 4);
	const month = date.substring(5, 7);
	const day = date.substring(8, 10);
	const hour = date.substring(11, 13);
	const minute = date.substring(14, 16);
	const second = date.substring(17, 19);
	return `${ year }-${ month }-${ day }T${ hour }:${ minute }:${ second }Z`;
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
					rules: event.rrule?.split(";").map((rule) => {
						const [ key, value ] = rule.split("=");
						if (key == "UNTIL") {
							return new Object({ until: formatDate(value) });
						} else if (key == "BYDAY") {
							return new Object({ days: value.toLowerCase().split(",") });
						}
						return new Object({ [key.toLowerCase()]: value });
					}).reduce((a, b) => ({ ...a, ...b }), {}),
					excluded: event.exdate?.map((date) => formatDate(date.value)),
					//raw: event,
				} as CalendarEvent;
			});
		}),
	);

	const repeatedEvents = createRepeatedEvents(events.flat().filter((event) => event.rules));
	const otherEvents = events.flat().filter((event) => !event.rules);

	const allEvents = repeatedEvents.concat(otherEvents)
		.filter((event) => new Date(event.end).getTime() > new Date().getTime())
		.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

	res.status(200).json(allEvents);
};

const createRepeatedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
	return events
		.filter((event) => {
			const start = new Date(event.start).getTime();
			const end = new Date(event.end).getTime();
			const until = new Date(event.rules?.until).getTime();
			const now = new Date().getTime();
			const count = parseInt(event.rules?.count);
			const freq = event.rules?.freq;

			const DAYS = 1000 * 60 * 60 * 24;
			const WEEKS = DAYS * 7;

			return (until > now)
				|| (start < now && end > now)
				|| (count && freq === "DAILY" ? start + count * DAYS > now : false)
				|| (count && freq === "WEEKLY" ? start + count * WEEKS > now : false)
				|| (!count && !until && freq)
				|| (!count && !until && freq);
		})
		.map((event) => {
			const events = [];
			const start = new Date(event.start).getTime();
			const end = new Date(event.end).getTime();
			const until = new Date(event.rules?.until).getTime();
			const now = new Date().getTime();
			const count = parseInt(event.rules?.count);
			const excluded = event.excluded?.map((date) => new Date(date).getTime());

			const DAYS = 1000 * 60 * 60 * 24;
			const WEEKS = DAYS * 7;

			if (event.rules?.freq === "WEEKLY" && until && start > now) {
				const diff = Math.floor((until - start) / WEEKS);
				for (let i = 0; i < diff; i++) {
					event.rules?.days.map((day) => {
						const newEvent = { ...event };
						newEvent.start = formatISODate(new Date(start + i * WEEKS + Day2[day] * DAYS).toISOString());
						newEvent.end = formatISODate(new Date(end + i * WEEKS + Day2[day] * DAYS).toISOString());

						excluded && excluded.includes(new Date(newEvent.start).getTime()) ? null : events.push(newEvent);
					});
				}
			} else if (event.rules?.freq === "WEEKLY" && until && start < now) {
				const diff = Math.floor((now - start) / WEEKS);
				for (let i = 0; i < diff; i++) {
					event.rules?.days.map((day) => {
						const newEvent = { ...event };
						newEvent.start = formatISODate(new Date(start + i * WEEKS + Day2[day] * DAYS).toISOString());
						newEvent.end = formatISODate(new Date(end + i * WEEKS + Day2[day] * DAYS).toISOString());

						excluded && excluded.includes(new Date(newEvent.start).getTime()) ? null : events.push(newEvent);
					});
				}
			} else if (event.rules?.freq === "WEEKLY" && !count && !until) {
				const oneYear = 52 * WEEKS;
				const diff = Math.floor((oneYear + now - start) / WEEKS);
				for (let i = 0; i < diff; i++) {
					const newEvent = { ...event };
					newEvent.start = formatISODate(new Date(start + i * WEEKS).toISOString());
					newEvent.end = formatISODate(new Date(end + i * WEEKS).toISOString());

					excluded && excluded.includes(new Date(newEvent.start).getTime()) ? null : events.push(newEvent);

				}
			}

			return events.flat();
		}).flat();
};

export default handler;