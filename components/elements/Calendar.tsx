import CalendarIcon from "@components/CalendarIcon";
import { CalendarEvent } from "@interfaces/index";
import { Grid, Stack, Typography } from "@mui/material";
import { addZero } from "@utils/functions";
import React, { useEffect, useState } from "react";

const formatDate = (date: string, fullDay = false) => {
	const newDate = new Date(date);
	const now = new Date();

	if (newDate.getTime() < now.getTime()) {
		return "Now";
	} else if (newDate.toDateString() === new Date().toDateString()) {
		return fullDay
			? "Today"
			: `Today, ${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
	} else if (newDate.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
		return fullDay
			? "Tomorrow"
			: `Tomorrow, ${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
	} else if (newDate.getFullYear() === new Date().getFullYear() && newDate.getMonth() === new Date().getMonth() && newDate.getDate() >= new Date().getDate() && newDate.getDate() <= new Date().getDate() + 7) {
		return fullDay
			? `${ newDate.toLocaleString("en-us", { weekday: "long" }) }`
			: `${ newDate.toLocaleString("en-us", { weekday: "long" }) }, ${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
	}
	return fullDay
		? `${ addZero(newDate.getDate()) }.${ addZero(newDate.getMonth() + 1) }`
		: `${ addZero(newDate.getDate()) }.${ addZero(newDate.getMonth() + 1) } ${ addZero(newDate.getHours()) }:${ addZero(newDate.getMinutes()) }`;
};

const Calendar = ({ size, apiURL }: { size: number, apiURL: string }) => {
	const [ calendar, setCalendar ] = useState(null);

	const getData = () => {
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
		}, 1000 * 30);
	}, []);

	return (
		<Grid item xs={ size } className="weather item" sx={ {
			padding: "1rem",
		} }>
			<Stack direction={ "column" } spacing={ 1 }>
				{ calendar?.map((event: CalendarEvent, index: number) => {
					if (index < 10) {
						event.location = event.location.replaceAll("\\", "");
						event.description = event.description.replaceAll("\\", "");

						return (
							<Grid container key={ index } spacing={ 0 } sx={ {
								display: "flex",
								alignItems: "flex-start",
							} }>
								<Grid item xs={ .5 }>
									<CalendarIcon calendar={ event.calendar } />
								</Grid>
								<Grid item xs={ 3 }>
									<Typography variant={ "h6" } component={ "span" }>
										{ formatDate(event.start, event.startAllDay) }
									</Typography>
								</Grid>
								<Grid item xs={ 8.5 }>
									<Typography variant={ "h6" } component={ "span" }>{ event.summary }</Typography>
								</Grid>
								<Grid item xs={ .5 }></Grid>
								<Grid item xs={ 11.5 } sx={ {
									marginTop: "-.5rem",
								} }>
									<Typography variant={ "h6" } component={ "span" } sx={ {
										color: "text.secondary",
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