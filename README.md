# Home Dashboard

_in development_  
Dashboard to display calendar with events, weather and more for your smart home. You can add your own configuration for calendars and weather.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)
    - [Requirements](#requirements)
    - [Setup](#setup)
- [Configuration](#configuration)
    - [Calendar](#calendar)
    - [Weather](#weather)
    - [Other](#other)

## Features

- Calendar with events
- Weather daily and hourly forecast and current weather
- Clock with date
- Screen saver with time and date

### In development

- Screen saver with next event
- Localisation options
- More weather sources

## Installation

### Requirements

- Node.js LTS
- npm

### Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Get a free API key at [openweathermap.org](https://home.openweathermap.org/api_keys)
4. Create a `.env.local` file in the root of the project and add the following variable with your API key:

```dotenv
OWM_API_KEY=your_open_weather_map_api_key
```

5. Run `npm run dev` to start the development server or `npm run build` to build the project and `npm run start` to start the production server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Configuration

You can configure the dashboard by editing the files in the `/config` folder.

### Calendar

To add a calendar you need to add a new object to the `calendar.tsx` with the following properties:  
`url` is the url to the calendar file (iCal format).  
`name` is the name of the calendar.  
`icon` is the [mui](https://mui.com/material-ui/material-icons/) icon to display for the calendar. The default is this: `<EventIcon sx={ { color: "#ffffff" } } />`, but you can use any icon from the mui library by adding it at the top of the file and change the color to anything you want

### Weather

To add a weather location you need to add a new object to the `locations.ts` with the following properties:  
`id` is the id of the location.  
`name` is the name of the location.  
`state` is the state of the location.  
`country` is the country of the location.  
`lat` is the latitude of the location.  
`lon` is the longitude of the location.

Both, `lat` and `lon`, you can get from [openweathermap.org](https://openweathermap.org/find) by searching for your location.

### Other

You can change the refresh interval for the weather and calendar in the `config.ts` file by changing the properties in `appConfig.intervals`. The values are in ms.

You can change the screen saver timeout in the `config.ts` file by changing the property in `appConfig.screenTimeout`. The value is in ms.

On both you can use math expressions like `1 * 60 * 1000` for 1 minute.