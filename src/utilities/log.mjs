function log(string) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.DEBUG) {
    // eslint-disable-next-line no-console
    console.log(string);
  }
}

export function error(string) {
  // eslint-disable-next-line no-console
  console.error(string);
}

export default log;
