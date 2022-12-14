# Weather Winton

User Friendly Weather Forecast (South London) web app.

Experimental app for innovative user experience in weather forecasting.

Inspired by Negroponte, N. (1995). Being digital. New York: Knopf. p.55.

## Prerequisites

- Met Office account for api-metoffice.apiconnect.ibmcloud.com

- Gatsby Cloud account

- ifttt.com account

- Install node v14.15.1 or greater

Set up environment variables:

- GATSBY_SITE_URL - url of client website for social sharing using Open Graph
- GATSBY_MET_WEATHER_DAILY_URL=<https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/daily?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- GATSBY_MET_WEATHER_HOURLY_URL=<https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/hourly?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- GATSBY_MET_WEATHER_ID= id for your met office account
- GATSBY_MET_WEATHER_SECRET= secret for your met office account

## Getting started

At a command line run:

```console
yarn install
yarn start
```

Set up ifttt.com hourly webhook trigger of Gatsby Cloud build of the Gatsby.js forecast static site.

## Author

[Louie Christie](https://www.louiechristie.com)
