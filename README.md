# Weather Winton

User Friendly Weather Forecast (South London) web app.

Experimental app for innovative user experience in weather forecasting.

Inspired by Negroponte, N. (1995). Being digital. New York: Knopf. p.55.

## Prerequisites

- Met Office account for [Met Office Data Hub](https://datahub.metoffice.gov.uk/)

- Install node v20.14.0 or greater

Set up environment variables:

- BASE_URL - url of client website for social sharing using Open Graph
- MET_WEATHER_DAILY_URL=<https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- MET_WEATHER_HOURLY_URL=<https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?excludeParameterMetadata=true&latitude=51.477753&longitude=-0.035913>
- MET_WEATHER_SECRET= api key for your met office account

To host online:

- Somewhere to host on the cloud e.g. Vercel account

- ifttt.com account, or similar to trigger hourly (or regular) builds

## Getting started

At a command line run:

```console
npm install
npm run start
```

To fetch the season effects storm data from Wikipedia, run:

```console
npm run fetch-storms
```

### Local cache for Met Office data

To avoid hitting the Met Office API rate limits during development and testing, you can cache daily and hourly JSON locally.

1. Ensure `.env` has `MET_WEATHER_DAILY_URL`, `MET_WEATHER_HOURLY_URL` and `MET_WEATHER_SECRET` set.
2. Run the cache script (this reads `.env` automatically):

```console
npm run cache-metoffice
```

This writes `data/daily/cached-daily.json` and `data/daily/cached-hourly.json`.

3. To force the app to read from the cached files instead of fetching live from the API, set (for local development/testing only):

```dotenv
MET_WEATHER_USE_CACHE=true
```

When `MET_WEATHER_USE_CACHE` is `true`, `getForecast()` reads the cached files. If the cache is missing, the script will throw; run `npm run cache-metoffice` to create the cache files.

Note: Do not set `MET_WEATHER_USE_CACHE=true` in CI. For CI, prefer one of the following approaches:

- Run `npm run cache-metoffice` as a setup step and expose the generated cache files in the CI workspace, so tests can run against them.
- Mock Met Office network requests in tests to make them deterministic in CI.

Set up ifttt.com hourly webhook trigger of build of the forecast static site.

## Author

[Louie Christie](https://www.louiechristie.com)
