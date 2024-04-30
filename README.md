# Weather App

This is a simple proof of concept for a weather app built in React.js employing `tomorrow.io` API for weather information.

## Features
- Search for weather information by city name
- Display weather information for current location
- Include a 5-day forecast
- Fully Responsive Design using `Bootstrap 5`

## API Restrictions
- 3 Requests per second
- 25 Requests per hour
- 500 Requests per day

## Running the Application
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Terminal will log the localhost port where the application is running, typically `http://localhost:5173/`

## Unimplemented Features [Future Work]
- Location Saving
  - Design is set up as a proof of concept
  - Implementation method would be to employ localStorage in browser and save a list of objects with the location name/coordinates
  - When loading, would make an api call to get the weather information, such as weatherCode and the temperature to be displayed
  - Problem with implementation is rate limitations on the API
- Unit Conversion
  - Currently, the app only displays in metric units
  - Implementation would be to add a button to toggle between metric and imperial units
  - Will require an api call to get the weather information in the desired units, or alternatively convert values locally
- Detailed Weather information for 5day forecast
  - Currently, the 5 day forecast displays just temperature, conditions, and icon
  - Implementation would be to add more detailed information on hover/click 
