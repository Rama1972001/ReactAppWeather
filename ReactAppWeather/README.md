# Weather Forecast App

Description
This is a React application that uses the OpenWeatherMap API to display weather information for a user-specified city. The application displays weather information for the next 5 days, with a description of the weather, an icon representing the weather conditions, and the temperature in Celsius.

Installation
To use this application, you will need to have Node.js and npm installed on your computer. Clone this repository, and then run the following command in your terminal:

Copy code
npm install
This will install all the dependencies required to run the application.

Usage
To run the application, run the following command in your terminal:

sql
Copy code
npm start
This will start the development server and open the application in your default browser.

To use the application, enter the name of a city in the input box and click the "Get Weather" button. The application will make a call to the OpenWeatherMap API and display the weather information for the specified city.

Code Explanation
The App component is the main component of the application. It has a state that contains the current city and an array of 5 objects, each representing a day's weather information.

The CityInput component allows the user to enter the name of a city and make an API call to get the weather information for that city.

The WeatherBox component displays the weather information for a single day.

The MainWeatherWindow component is the main display area of the application. It displays the weather information for the current day, along with an input box for entering a city name and a list of WeatherBox components for the next 4 days.

The getDayIndices function is used to get the indices of the forecasts for the next 5 days from the API data. It iterates over each forecast in the data array and checks if it is at 12:00 pm and has a different date than the previous forecast. It then adds the index of the forecast to the dayIndices array.
