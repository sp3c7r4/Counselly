class errorHelper {
  static returnErrorLog(err) {
    return {
      message: err.toString(),
      stack: err.stack,
    };
  }
}
export default errorHelper;
