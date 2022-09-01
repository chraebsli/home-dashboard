export const round = (value, precision) => {
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
};

export const getWindDirection = (degrees) => {
	const directions = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ];
	const index = Math.floor((degrees + 11.25) / 22.5);
	return directions[index % 8];
};

export const addZero = (number: number) => number < 10 ? `0${ number }` : number;

export const toFloat = (num: number, dec = 1) => num.toFixed(dec);

export const randomFromArray = (data) => data[Math.floor(Math.random() * data.length)];
export const randomFromRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const solve = (str: string): number => new Function(`return ${ str }`)();
