export default class CustomError extends Error {
  constructor(message, status_code, status) {
    super(message);
    this.status = status;
    this.status_code = status_code;
    this.name = this.constructor.name; //
  }
}
