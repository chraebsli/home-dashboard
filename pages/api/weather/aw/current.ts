import { NextApiRequest, NextApiResponse } from "next";
import { currentTestWeatherData } from "../../../../utils/AWTestWeatherData";

const apiKey = process.env.AW_API_KEY;
const location = {
	name: "Rumisberg",
	key: 312449
};

const requestURL = `http://dataservice.accuweather.com/currentconditions/v1/${ location.key }?apikey=${ apiKey }&details=true`;
const handler = async ( _req: NextApiRequest, res: NextApiResponse ) => {
	if ( !process.env.NEXT_PUBLIC_API_TEST ) {
		await fetch( requestURL )
			.then( data => data.json() )
			.then( data => {
				return {
					description: data[ 0 ].WeatherText,
					icon: data[ 0 ].WeatherIcon,
					temperature: {
						real: data[ 0 ].Temperature.Metric.Value,
						feel: data[ 0 ].RealFeelTemperature.Metric.Value,
					},
					wind: {
						direction: data[ 0 ].Wind.Direction.English,
						speed: data[ 0 ].Wind.Speed.Metric.Value,
					},
					uvIndex: data[ 0 ].UVIndex,
					precipitation: {
						now: data[ 0 ].PrecipitationSummary.Precipitation.Metric.Value,
					},
					service: "accuweather",
					cached: false
				};
			} )
			.then( data => res.status( 200 ).json( data ) );
	} else {
		res.status( 200 ).json( currentTestWeatherData() );
	}
};

export default handler;
