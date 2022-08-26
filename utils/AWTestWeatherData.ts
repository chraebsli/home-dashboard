export const currentTestWeatherData = () => {
	return {
		description: "Sunny",
		icon: 1,
		temperature: {
			real: 12.3,
			feel: 15.9,
		},
		wind: {
			direction: "E",
			speed: 0,
		},
		uvIndex: 2,
		precipitation: {
			now: 0,
		},
		service: "accuweather",
		cached: true,
	};
};
