# Weather Winton

User Friendly Weather Forecast (South London) web app.

Experimental app for innovative user experience in weather forecasting.

Inspired by Negroponte, N. (1995). Being digital. New York: Knopf.

## Prerequisites

### Client and server

- Install node v10.13.0 or greater
- Install yarn v1.x

### Client Only

Set up environment variables:

- GATSBY_SITE_URL - url of client website for social sharing using Open Graph
- GATSBY_API_URL - url of the api

## Getting started

### Start the server

```console
cd server
yarn
yarn start
```

### Start the client (in a new terminal)

```console
cd client
yarn
yarn start
```

## Monorepo directories

### /server

Weather forecast server (Node) tested on Heroku.com.

## /client

Website forecast static site (Gastby.js) tested using Gatsby Cloud, Netlify, and ifttt.com daily webhook trigger to Gatsby Cloud

## Author

[Louie Christie](https://www.louiechristie.com)
