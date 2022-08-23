export const currentTestWeatherData = () => {
	return {
		description: "Clear",
		icon: "01d",
		temperature: {
			real: 15.73,
			feel: 15.47
		},
		wind: {
			direction: 50,
			speed: 2.06
		},
		sunrise: 1661229387,
		sunset: 1661279291,
		service: "openweathermap",
		cached: false
	};
};
