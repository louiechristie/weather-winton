# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weather Winton is a Next.js-based weather forecasting web application that provides friendly weather forecasts for South London. The app fetches data from the Met Office API and transforms it into user-friendly weather information with special handling for holidays, heatwaves, and other weather events.

## Architecture

The application follows a Next.js static generation pattern:

- **Data Layer**: Fetches weather data from Met Office API using `getForecast.ts`
- **Transformation Layer**: `transformMetOfficeJSON.ts` processes raw Met Office GeoJSON into app-specific data structures
- **Components**: React components in `src/components/` render weather information
- **Utilities**: Weather calculation and formatting utilities in `src/utilities/`
- **Types**: TypeScript types in `src/types/` define Met Office API and app data structures

### Key Data Flow

1. `getForecast.ts` fetches daily and hourly weather data from Met Office API
2. `transformMetOfficeJSON.ts` processes the raw data into `item[]` format with friendly descriptions, temperature calculations, and weather conditions
3. Next.js `getStaticProps()` in `pages/index.tsx` generates static content at build time
4. Components render the processed weather data with styled temperature indicators

## Development Commands

### Testing

- `npm test` - Run all tests (unit + integration)
- `npm run test:unit` - Run Jest unit tests only
- `npm run test:unit:watch` - Run Jest tests in watch mode
- `npm run test:integration` - Run Playwright integration tests
- `npm run test:integration:debug` - Run Playwright tests with UI

### Linting and Type Checking

- `npm run lint` - Run TypeScript compiler check, then ESLint and Stylelint
- `npm run lint:tsc` - Run TypeScript compiler check only
- `npm run lint:fix` - Auto-fix ESLint and Stylelint issues

### Development

- `npm run start` - Start Next.js development server with Turbopack
- `npm run build` - Build production version
- `npm run serve` - Serve production build

## Environment Variables

Required for production builds:

- `BASE_URL` - Base URL for social sharing
- `MET_WEATHER_DAILY_URL` - Met Office daily forecast API endpoint
- `MET_WEATHER_HOURLY_URL` - Met Office hourly forecast API endpoint
- `MET_WEATHER_SECRET` - Met Office API key

## Testing Strategy

- **Unit Tests**: Jest tests for utilities and data transformations (`.test.mjs` and `.test.ts` files)
- **Integration Tests**: Playwright tests for end-to-end functionality in `tests/` directory
- **Mock Data**: Test utilities generate mock Met Office API responses for predictable testing

## Code Conventions

- **Mixed Extensions**: Legacy `.mjs` files alongside newer `.ts`/`.tsx` files (migration in progress)
- **Type Safety**: TypeScript with strict type checking enabled
- **ESLint**: Uses neostandard configuration with Next.js and React rules
- **Styling**: CSS-in-JS with inline styles using a theme system

## Special Features

- **Temperature-based Styling**: App bar colors change based on temperature ranges
- **Special Dates**: Handles holidays, heatwaves, and special weather events with custom messaging
- **Raincoat Logic**: Sophisticated precipitation probability analysis for "take raincoat" recommendations
- **Heatwave Detection**: Multi-day temperature analysis for heatwave warnings

## Key Files to Understand

- `src/utilities/getForecast.ts` - Main data fetching logic
- `src/utilities/transformMetOfficeJSON.ts` - Data transformation core
- `src/types/metOffice.ts` - Met Office API type definitions with Zod v4.1.12 runtime validation
- `src/pages/index.tsx` - Main page with static generation
- `src/utilities/metOfficeWeatherUtils.ts` - Weather code interpretations

**Note on Optional Fields**: Some Met Office API fields are optional in schemas: retrospective fields (`maxScreenAirTemp`, `minScreenAirTemp`, `max10mWindGust`) only exist for recent past hours, and conditional fields (`totalPrecipAmount`, `totalSnowAmount`) may be absent. Always use `??` or `?.` when accessing these.
