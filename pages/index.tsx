import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Action from "@components/elements/Action";
import Calendar from "@components/elements/Calendar";
import Clock from "@components/elements/Clock";
import Forecast, { FType, Location } from "@components/elements/Forecast";
import Screensaver from "@components/elements/Screensaver";
import Weather from "@components/elements/Weather";
import Layout from "@components/Layout";
import { appConfig } from "config/config";

const App = () => {
	const [ apiURL, setApiURL ] = React.useState("http://localhost:3000/api");
	useEffect(() => {
		setApiURL(`${ window.location.origin }/api`);
	}, []);

	const [ location, setLocation ] = useState(Location.Wiedlisbach);
	const [ fType, setFType ] = useState(FType.hourly);

	const [ sleep, setSleep ] = useState(false);
	const [ renderTime, setRenderTime ] = useState(new Date().getTime());
	const [ currentTime, setCurrentTime ] = useState(new Date().getTime());
	const resetSleep = () => {
		setRenderTime(new Date().getTime());
		setCurrentTime(new Date().getTime());
		setSleep(false);
	};

	useEffect(() => { window.onmousemove = () => { resetSleep(); }; });

	useEffect(() => {
		const timeout = appConfig.screenTimeout;
		const interval = setInterval(() => {
			setCurrentTime(new Date().getTime());
			currentTime - renderTime > timeout ? setSleep(true) : null;
		}, 1000);
		return () => clearInterval(interval);
	}, [ renderTime, currentTime ]);

	return (
		<Layout>
			<Grid container direction={ "column" } onClick={ () => resetSleep() } sx={ {
				display: sleep ? "none" : "flex",
				backgroundColor: "background.default",
				padding: "3rem",
			} }>
				<Grid container item xs={ 2 }>
					<Clock size={ 2 } />
					<Grid item xs={ 8 } className="news"></Grid>
					<Weather size={ 2 } apiURL={ apiURL } location={ location } />
				</Grid>
				<Grid container item xs={ 8 }>
					<Calendar size={ 5 } apiURL={ apiURL } />
					<Grid item xs={ 5 } className="main"></Grid>
					<Forecast
						size={ 2 }
						apiURL={ apiURL }
						location={ location }
						setLocation={ setLocation }
						fType={ fType }
						setFType={ setFType } />
				</Grid>
				<Grid container item xs={ 2 }>
					<Grid item xs={ 12 } className="action"></Grid>
				</Grid>
				<Action sleep={ sleep } setSleep={ setSleep } />
			</Grid>
			<Screensaver sleep={ sleep } resetSleep={ resetSleep } />
		</Layout>
	);
};

export default App;
