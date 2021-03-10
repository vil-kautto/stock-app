# StockApp

A simple stock analyzer developed by Ville Kautto

## About

This is a demo app for fetching stock data and displaying it on a web application.

## Usage

To use the application you must upload a .csv file which contains stock's historical quotes

The data can be feched from [nasdaq's website](https://www.nasdaq.com/market-activity)

After uploading the data you are asked to enter a date range, in whivh you simply pick the start and end dates

After selecting the date range the application is ready to use and you can click the "fetch data" button to display the information.

## Setup instructions

You can clone the repository or download the .zip folder from the github page and run the server on your computer.
Instructions for site setup can be found below in "build" -section

## Project's folder structure

```
stock-app (project's root directory)
|
├───dist (angular's default build directory)
│   └───stock-app
|
├───e2e (end to end tests - unused in the project)
│   └───src
|
├───node-modules (conains all the packages needed in the project)
│
└───src (source code of the project)
    ├───app (code for each component)
    │   ├───csv-reader (reads and generates data from .csv files)
    │   ├───services (transfers data between components)
    │   └───tracker (Handles all data related operations)
    ├───assets (contains data objects used in the components)
    │   └───models
    └───environments
```

More specific details:
- the root directory also contains angular's setting files
- the src directory also contains files for managing the appalication's base settings
- only the files in the source directory have been edited

## Development server dependencies
Running the development server has the following dependencies:
- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.3. The following instructions were generated during project's initialization

clone the repository and run `ng serve` on the project's root directory for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
