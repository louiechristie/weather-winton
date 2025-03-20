function log(string) {
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG
  ) {
     
    console.log(string);
  }
}

export default log;
