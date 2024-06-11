# Weather Winton

User Friendly Weather Forecast (South London) web app.

Experimental app for innovative user experience in weather forecasting.

Inspired by Negroponte, N. (1995). Being digital. New York: Knopf. p.55.

## Prerequisites

- Met Office account for [Met Office Data Hub](https://datahub.metoffice.gov.uk/)

- Gatsby Cloud account

- ifttt.com account

- Install node v20.14.0 or greater

Set up environment variables:

- GATSBY_SITE_URL - url of client website for social sharing using Open Graph
- GATSBY_MET_WEATHER_DAILY_URL=<https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- GATSBY_MET_WEATHER_HOURLY_URL=<https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- GATSBY_MET_WEATHER_SECRET= api key for your met office account

## Getting started

At a command line run:

```console
yarn install
yarn start
```

Set up ifttt.com hourly webhook trigger of Gatsby Cloud build of the Gatsby.js forecast static site.

## Author

[Louie Christie](https://www.louiechristie.com)
