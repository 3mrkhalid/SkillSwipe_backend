const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Development mode (detailed)
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // Production mode (clean)
  if (err.isOperational) {
    // trusted error
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // unknown error
  console.error("ERROR", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

export default globalErrorHandler;