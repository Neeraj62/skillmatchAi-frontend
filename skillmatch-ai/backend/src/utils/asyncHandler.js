// ─── Async Handler ──────────────────────────────────────────────────
// Wraps an async Express handler so that any rejected promise is
// automatically forwarded to Express's error-handling middleware.
// This eliminates repetitive try/catch blocks in every controller.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
