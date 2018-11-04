# Employee Vacation Application

> This is an application used for managing vacation entries for employees.

This application is built using:

* TypeScript
* React
* Redux
* Webpack
* Sass
* ASP.NET Core

---

## Table of Contents

- [Project Components](#project-components)
- [Installation](#installation)
- [Development Setup](#development-setup)
    - [Seed Values](#seed-values)
- [License](#license)

---

## Project Components

Frontend and backend parts of the project are in separate folders:

- Frontend Project: `EmployeeVacationCalendar\EmployeeVacationCalendar.FE`
- Backend Project: `EmployeeVacationCalendar\EmployeeVacationCalendar.WebAPI`

## Installation

Tools that are required:
- NodeJS (LTS) : [https://nodejs.org/en/](https://nodejs.org/en/)
- Visual Studio 2017 or newer

### Frontend

- Open folder: `EmployeeVacationCalendar\EmployeeVacationCalendar.FE`
- Execute `yarn` or `npm install` to install node modules

### Backend

Backend requires not additional setup.

## Development Setup

1. Open solution in `EmployeeVacationCalendar\EmployeeVacationCalendar.WebAPI`
2. To configure the database connection string:
    - Open: `appsettings.Development.json`
    - Enter your connection string at `ConnectionStrings:EmployeeVacationDatabase`
3. Application is seeded with initial users who will have the password defined in  `appsettings.Development.json` -> `MasterAdmin`
    - `MasterAdmin:Email` defines username for the `MasterAdmin` user type (only one exists in the application, has all the rights as an ordinary administrator, but cannot be deleted)
4. To start the backend WEB API run the `EmployeeVacationCalendar.WebAPI.App` project
5. To start the frontend part of the application:
    - Open folder: `EmployeeVacationCalendar\EmployeeVacationCalendar.FE`
    - Run `yarn` or `npm install` if you didn't in the installation step
    - Start the webpack-dev-server with `npm run dev`
    - Your default web broswer should open in `http://localhost:3000` and should see the empty calendar

### Seed Values

Development and release version both have the initial `Master Admin` account with values defined in `appsettings.json`. In development, database is seeded with some test users (both User and Admin type) with password defined for `Master Admin`.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
