# Ubademy Payments

Based on the smart-contract-basic-service to solve payments in the Taller de Programacion 2' projects.

## Setup

* Requirement: node v12.18.1 required
* Assign an available port to the server (PORT 80 will be taken)
* Run `npm i`
* Run `npm start`

## Available endpoints

The following endpoints are available:

- **Create user wallet**

  `POST /users/:userId/wallet`
  - Path: *userId* is the numeric id of the user
  - Body: empty


- **Get user wallet**

  `GET /users/:userId/wallet`

  - Path: *userId* is the numeric id of the user
  - Body: empty


- **Deposit ethers into the Smart contract from user wallet**

  `POST /users/:userId/deposit`
  - Path: *userId* is the numeric id of the user
  - Body: *amountInEthers* as string property in JSON format


- **Get deposit of current month from user wallet**

  `GET /users/:userId/deposit`
  - Path: *userId* is the numeric id of the user
  - Body: empty

## Linting

To run the linter, after you installed the dependencies, just run

`npm run lint`
