import { FType, Location } from "@components/elements/Forecast";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function a11yProps(index: number){
	return { id: `simple-tab-${ index }`, "aria-controls": `simple-tabpanel-${ index }` };
}

const ForecastControl = ({
	location, setLocation, fType, setFType,
}: {
	location: Location, setLocation: React.Dispatch<React.SetStateAction<Location>>,
	fType: FType, setFType: React.Dispatch<React.SetStateAction<FType>>,
}) => {
	const fTypes = [ "hourly", "daily" ];
	const locations = [ "Wiedlisbach", "Bern" ];

	const handleLocationChange = (event: React.SyntheticEvent, value: number) => { setLocation(value); };
	const handleTypeChange = (event: React.SyntheticEvent, value: number) => { setFType(value); };

	return (
		<>
			<Box sx={ { borderBottom: 1, borderColor: "divider" } }>
				<Tabs
					value={ fType }
					onChange={ handleTypeChange }
					aria-label="basic tabs example"
					variant={ "fullWidth" }>
					{ fTypes?.map((item, index) => (
						<Tab key={ index } label={ item } { ...a11yProps(index) } />
					)) }
				</Tabs>
			</Box>
			<Box sx={ { borderBottom: 1, borderColor: "divider" } }>
				<Tabs
					value={ location }
					onChange={ handleLocationChange }
					aria-label="basic tabs example"
					variant={ "fullWidth" }>
					{ locations?.map((item, index) => (
						<Tab key={ index } label={ item } { ...a11yProps(index) } />
					)) }
				</Tabs>
			</Box>
		</>
	);
};

export default ForecastControl;