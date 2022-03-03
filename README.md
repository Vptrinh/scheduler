# Interview Scheduler

Interview Scheduler is a Single Page Application (SPA) that tracks and books interviews. This app allows users to add, edit, and delete appointments in real time. The data is persisted by the API server using PostgresSQL database and the client application communicartes with the API server over HTTP, using JSON format. 


### The Main Page
!['main-page'](https://github.com/Vptrinh/scheduler/blob/master/public/images/InterviewSchedulerDaily.PNG?raw=true)
_Selecting a day reveals the available and booked appointments for that day._

### Editing and Deleting an Appointment
!['Edit-and-delete'](https://github.com/Vptrinh/scheduler/blob/master/public/images/InterviewSchedulerDeleteEdit.PNG?raw=true)
_Editing and deleting an appointment is as easy as the touch of a button._

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Setting up the API/Database

The [API/Database](https://github.com/lighthouse-labs/scheduler-api) must run at the same time as the client app for full functionality. Follow the steps outlined in the README to install and setup the database.

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Babel/Core
- Storybook
- Jest
- React
- Node-sass
- Prop-types
- React-test-renderer