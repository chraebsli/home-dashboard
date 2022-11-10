export type CalendarEvent = {
	calendar: string,
	summary: string,
	description: string,
	location: string,
	startAllDay: boolean,
	start: string,
	endAllDay: boolean,
	end: string,
	stamp: string,
	created: string,
	modified: string,
	id: string,
	rules: {until?: string, freq?: string, interval?: string, count?: string, days?: string[]},
	excluded: string[]
}