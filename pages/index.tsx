import React from "react";
import { Grid } from "@mui/material";
import Layout from "@components/Layout";
import Clock from "@components/elements/Clock";
import Weather from "@components/elements/Weather";

const App = () => (
	<Layout>
		<Grid container direction={ "column" }
		      sx={ {
			      backgroundColor: "background.default",
			      padding: "1rem",
		      } }
		>
			<Grid container item xs={ 2 }>
				<Clock size={ 2 } />
				<Grid item xs={ 8 } className="news"></Grid>
				<Weather size={2} />
			</Grid>
			<Grid container item xs={ 8 }>
				<Grid item xs={ 2 } className="calendar"></Grid>
				<Grid item xs={ 8 } className="main"></Grid>
				<Grid item xs={ 2 } className="forecast"></Grid>
			</Grid>
			<Grid container item xs={ 2 }>
				<Grid item xs={ 12 } className="action"></Grid>
			</Grid>
		</Grid>
	</Layout>
);

export default App;
