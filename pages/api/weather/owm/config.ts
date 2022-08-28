export default function Config(){
	return {
		locations: [
			{
				name: "Rumisberg",
				country: "CH",
				state: "Bern",
				lat: 47.263451,
				lon: 7.6412018,
			},
			{
				name: "Bern",
				state: "Bern",
				country: "CH",
				lat: 46.9482713,
				lon: 7.4514512,
			},
		],
		apiKey: process.env.OWM_API_KEY,
	};
}