// ─── Standardized API Response ────────────────────────────────────
// Returns a consistent JSON shape across every endpoint:
// { success, statusCode, message, data }

class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message    - Human-readable success message
   * @param {*}      data       - Payload (object, array, null, etc.)
   */
  constructor(statusCode, message = "Success", data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
