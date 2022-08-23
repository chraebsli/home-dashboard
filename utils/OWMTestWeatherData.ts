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

export const forecastTestWeatherData = () => {
	return {
		code: "200",
		message: 0,
		forecasts: generateTestWeatherForecastData(),
		city: {
			name: "Wiedlisbach",
		},
		service: "openweathermap",
		cached: false
	};
};

const generateTestWeatherForecastData = () => {
	const forecasts = [];
	for ( let i = 0; i < 40; i++ ) {
		forecasts.push( {
			time: 1661245200 + i * 3600,
			temperature: {
				real: 19.48,
				feel: 19.39,
			},
			weather: {
				id: 800,
				main: "Clear",
				description: "clear sky",
				icon: "01d"
			},
			wind: {
				speed: 2.33,
				direction: 66,
			},
		} );
	}
	return forecasts;
};