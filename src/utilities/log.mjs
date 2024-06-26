function log(string) {
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG
  ) {
    // eslint-disable-next-line no-console
    console.log(string);
  }
}

export default log;
