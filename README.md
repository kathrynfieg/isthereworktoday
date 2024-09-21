# Is There Work Today?

**Is There Work Today?** is a fun single-page app that checks whether today is a public holiday based on your location. The app uses geolocation services to determine your state within Australia and provides information on whether today is a public holiday, along with a countdown to the next holiday if it's not.

## Features

- Automatically detects your location via geolocation (using LocationIQ)
- Checks if today is a public holiday in Australia (using date.nager.at API)
- Displays upcoming holidays and their names
- Provides a fun and simple user interface with real-time holiday information
- Allows users to manually select their state if geolocation is disabled or unsupported

## Tech Stack

- **Vue 3**: Frontend framework
- **@vueuse/core**: For utility functions like geolocation
- **@tanstack/vue-query**: For data fetching and caching
- **Axios**: For making HTTP requests
- **LocationIQ**: API for reverse geocoding to fetch country and state
- **date.nager.at**: API to retrieve public holiday information
- **Vite**: Build tool for faster development

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/<your-username>/isthereworktoday.git
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a .env file in the root directory and add the following environment variables:

    ```bash
    VITE_LOCATIONIQ_API_KEY=<your-locationiq-api-key>
    VITE_LOCATIONIQ_API=https://us1.locationiq.com/v1/reverse.php
    VITE_NAGER_DATE_API=https://date.nager.at/api/v2
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## Usage

- **Automatic Geolocation**: When you open the app, it will automatically try to determine your location. If you're in Australia, it will display whether today is a public holiday in your state.
- **Manual State Selection**: If geolocation fails, you can manually select your state to check for public holidays.
- **Holiday Countdown**: If today isn't a public holiday, you'll see a countdown to the next holiday.

## API Endpoints Used

- **LocationIQ Reverse Geocoding API**: To determine the user's location (country and state) from their latitude and longitude.
- **Nager Date Public Holidays API**: To check if today is a public holiday and fetch a list of upcoming holidays.

## Folder Structure

```graphql
src/
│
├── api/                    # API calls and functions
│   ├── getReversedLocation.ts
│   ├── getAuPublicHolidays.ts
│   └── getIsTodayHoliday.ts
│
├── components/             # Vue components
│
├── models/                 # TypeScript models for API responses
│
├── App.vue                 # Main Vue component
├── main.ts                 # Entry point for the app
│
└── styles/                 # Global and scoped styles
```
