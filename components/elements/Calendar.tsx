import CalendarIcon from "@components/CalendarIcon";
import { CalendarEvent } from "@interfaces/calendar";
import { Grid, Stack, Typography } from "@mui/material";
import { addZero, solve } from "@utils/functions";
import React, { useEffect, useState } from "react";

const formatDate = (date: string, fullDay = false) => {
	const newDate = new Date(date);
	const now = new Date();

	if (newDate.getTime() < now.getTime()) {
		return "Now";
	} else if (newDate.toDateString() === new Date().toDateString()) {
		return fullDay
			? "Today"
			: `Today, ${ addZero(newDate.getHours() - 2) }:${ addZero(newDate.getMinutes()) }`;
	} else if (newDate.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
		return fullDay
			? "Tomorrow"
			: `Tomorrow, ${ addZero(newDate.getHours() - 2) }:${ addZero(newDate.getMinutes()) }`;
	} else if (newDate.getFullYear() === new Date().getFullYear() && newDate.getMonth() === new Date().getMonth() && newDate.getDate() >= new Date().getDate() && newDate.getDate() <= new Date().getDate() + 7) {
		return fullDay
			? `${ newDate.toLocaleString("en-us", { weekday: "long" }) }`
			: `${ newDate.toLocaleString("en-us", { weekday: "long" }) }, ${ addZero(newDate.getHours() - 2) }:${ addZero(newDate.getMinutes()) }`;
	}
	return fullDay
		? `${ addZero(newDate.getDate()) }.${ addZero(newDate.getMonth() + 1) }`
		: `${ addZero(newDate.getDate()) }.${ addZero(newDate.getMonth() + 1) } ${ addZero(newDate.getHours() - 2) }:${ addZero(newDate.getMinutes()) }`;
};

const Calendar = ({ size, apiURL }: { size: number, apiURL: string }) => {
	const [ calendar, setCalendar ] = useState(null);

	const getData = () => {
		console.log("Getting calendar data...");
		fetch(`${ apiURL }/calendar/`)
			.then(res => res.json() as Promise<CalendarEvent[]>)
			.then(data => {
				data[0].calendar ? setCalendar(data) : null;
			});
	};

	useEffect(() => {
		getData();
		setInterval(() => {
			getData();
		}, solve(process.env.NEXT_PUBLIC_CALENDAR_REFRESH));
	}, []);

	return (
		<Grid item xs={ size } className="calendar item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 } sx={ {
				maxHeight: "50%",
				maxWidth: "70%",
			} }>
				{ calendar?.map((event: CalendarEvent, index: number) => {
					if (index < 20) {
						event.location = event.location.replaceAll("\\", "");
						event.description = event.description.replaceAll("\\", "");

						return (
							<Grid container key={ index } spacing={ 0 } sx={ {
								display: "flex",
								alignItems: "flex-start",
							} }>
								<Grid item xs={ .8 }>
									<CalendarIcon calendar={ event.calendar } />
								</Grid>
								<Grid item xs={ 4.2 }>
									<Typography variant={ "h6" } component={ "span" }>
										{ formatDate(event.start, event.startAllDay) }
									</Typography>
								</Grid>
								<Grid item xs={ 7 }>
									<Typography variant={ "h6" } component={ "span" }>{ event.summary }</Typography>
								</Grid>
								<Grid item xs={ .8 }></Grid>
								<Grid item xs={ 11.2 } sx={ {
									color: "text.secondary",
									marginTop: "-.5rem",
									textOverflow: "ellipsis",
									overflowX: "hidden",
								} }>
									<Typography variant={ "h6" } component={ "span" } sx={ {
										whiteSpace: "nowrap",
									} }>
										{ event.location ?
											`${ event.location }, ${ event.description }`
											: event.description
										}
									</Typography>
								</Grid>
							</Grid>
						);
					}
				}) }
			</Stack>
		</Grid>
	);
};

export default Calendar;