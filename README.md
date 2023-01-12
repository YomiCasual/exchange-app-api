# Exchange App API

## Project Tools

This project was bootstrapped with

- Nestjs
- Axios (for fetching exchange rates)
- Class validator (Transform Data)
- Mongoose (Database Manipulation for MongoDb)

## Project Installation

1.  Ensure you have node installed on your system
2.  Clone the repository by running
    ```
    git clone
    ```
3.  Create an env file in the root and paste the following
    ```
    MONGOD_URL=mongodb://localhost/exchange
    MONGOD_URL_TEST=mongodb://localhost/exchangetest
    PORT=3300
    ```
4.  At the root folder run, open the terminal and run:
    ```
    yarn install
    ```
5.  Wait for it to install and run:
    ```
    yarn  start:dev
    ```
6.  Wait for the app to build and go to localhost:3000 or the port shown from the terminal

## Assumptions/Features added

1. Ability to exchange crypto to fiat
2. Ability to fetch live prices with appropriate/flexible conversion (DEFAULT TO USD)
3. Ability to stream live prices and exchanged prices

## Requirements Not Covered

All Necessary requirements were met according to the documents

## Issues faced

No issue faced

## Thank You
