import React from "react";
import { SpeedDial, SpeedDialAction, Stack } from "@mui/material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ReplayIcon from "@mui/icons-material/Replay";
import WidgetsIcon from "@mui/icons-material/Widgets";

const Action = ({ sleep, setSleep }: { sleep: boolean, setSleep }) => {
	const [ open, setOpen ] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const reload = () => window.location.reload();
	const fabSetSleep = () => {
		setTimeout(() => {
			setSleep(!sleep);
		}, 500);
	};

	const actions = [
		{ name: "reload", action: reload, icon: <ReplayIcon color={ "disabled" } /> },
		{ name: "sleep", action: fabSetSleep, icon: <NightsStayIcon color={ "disabled" } /> },
	];

	return !sleep ? (
		<Stack
			direction="row"
			sx={ {
				position: "absolute", bottom: "2rem", left: "1rem", right: "1rem", width: "calc(100% - 2rem)",
				justifyContent: "center",
			} }
		>
			<SpeedDial
				ariaLabel="SpeedDial controlled open example"
				icon={ <WidgetsIcon /> }
				onClick={ handleOpen }
				onClose={ handleClose }
				onOpen={ handleOpen }
				open={ open }
				direction={ "up" }
				FabProps={ { size: "large" } }
			>
				{ actions.map(action => (
					<SpeedDialAction
						key={ action.name }
						icon={ action.icon }
						tooltipTitle={ action.name }
						onClick={ action.action }
						FabProps={ { size: "large" } }
					/>
				)) }
			</SpeedDial>
		</Stack>
	) : null;
};

export default Action;
