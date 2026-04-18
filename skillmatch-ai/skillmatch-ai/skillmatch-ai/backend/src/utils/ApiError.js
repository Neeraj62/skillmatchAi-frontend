// ─── Custom API Error ─────────────────────────────────────────────
// Extends the native Error with an HTTP statusCode so the global
// error handler can respond consistently without guessing.

class ApiError extends Error {
  /**
   * @param {number} statusCode  - HTTP status code (e.g. 400, 401, 404, 500)
   * @param {string} message     - Human-readable error message
   * @param {Array}  errors      - Optional array of granular validation errors
   * @param {string} stack       - Optional custom stack trace
   */
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
