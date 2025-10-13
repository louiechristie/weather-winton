/**
 * Jest global setup - runs before all test suites
 * Checks for required environment variables and aborts if missing
 */

// Load environment variables from .env file
import 'dotenv/config';

export default async function globalSetup() {
  const requiredEnvVars = [
    'BASE_URL',
    'MET_WEATHER_DAILY_URL',
    'MET_WEATHER_HOURLY_URL',
    'MET_WEATHER_SECRET',
  ];

  const missingVars = [];
  const emptyVars = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    } else if (process.env[varName].trim() === '') {
      emptyVars.push(varName);
    }
  });

  // Report all issues together
  if (missingVars.length > 0 || emptyVars.length > 0) {
    console.error('\n\x1b[31m✖ Preflight Check Failed:\x1b[0m');

    if (missingVars.length > 0) {
      console.error(
        `\x1b[31mMissing required environment variables: ${missingVars.join(', ')}\x1b[0m`
      );
    }

    if (emptyVars.length > 0) {
      console.error(
        `\x1b[31mEnvironment variables with empty values: ${emptyVars.join(', ')}\x1b[0m`
      );
    }

    console.error('\x1b[33mPlease ensure all required environment variables from .env file are set.\x1b[0m\n');
    process.exit(1);
  }

  console.log('\x1b[32m✓ Preflight Check Passed: All required environment variables are present\x1b[0m');
}
