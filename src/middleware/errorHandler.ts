import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../utils/app.error";


// PrismaClientKnownRequestError
// Thrown when the database rejects a valid Prisma query with a known error.
// Examples: unique constraint violations (P2002), foreign key violations (P2003),
// or attempting to update/delete a record that does not exist (P2025).
const handlePrismaKnownError = (
  err: Prisma.PrismaClientKnownRequestError,
): AppError => {
  const errorMap: Record<string, () => AppError> = {
    P2000: () =>
      new AppError({
        message: "Value is too long for one of the fields.",
        statusCode: 400,
        code: "PRISMA_VALUE_TOO_LONG",
        // isOperational: true,
      }),

    P2002: () =>
      new AppError({
        message: "A record with the same unique value already exists.",
        statusCode: 409,
        code: "PRISMA_UNIQUE_CONSTRAINT_FAILED",
        // isOperational: true,
      }),

    P2003: () =>
      new AppError({
        message: "Invalid reference to a related record.",
        statusCode: 400,
        code: "PRISMA_FOREIGN_KEY_CONSTRAINT_FAILED",
        // isOperational: true,
      }),

    P2011: () =>
      new AppError({
        message: "A required field cannot be null.",
        statusCode: 400,
        code: "PRISMA_NULL_CONSTRAINT_VIOLATION",
        // isOperational: true,
      }),

    P2012: () =>
      new AppError({
        message: "Missing a required field.",
        statusCode: 400,
        code: "PRISMA_MISSING_REQUIRED_VALUE",
        // isOperational: true,
      }),

    P2024: () =>
      new AppError({
        message: "Database connection timed out.",
        statusCode: 503,
        code: "PRISMA_DATABASE_TIMEOUT",
        // isOperational: true,
      }),

    P2025: () =>
      new AppError({
        message: "The requested record was not found.",
        statusCode: 404,
        code: "PRISMA_RECORD_NOT_FOUND",
        // isOperational: true,
      }),
  };

  return (
    errorMap[err.code]?.() ||
    new AppError({
      message: err.message,
      statusCode: 500,
      code: err.code,
      isOperational: true,
    })
  );
};

// PrismaClientUnknownRequestError
// Thrown when an unexpected database or query engine error occurs that Prisma
// cannot classify into a known error code. Typically treated as an internal server error.
const handlePrismaUnknownError = (
  err: Prisma.PrismaClientUnknownRequestError,
): AppError => {
  return new AppError({
    message: err.message,
    statusCode: 500,
    code: "PRISMA_UNKNOWN_ERROR",
    isOperational: true,
  });
};

// PrismaClientRustPanicError
// Thrown when Prisma's underlying Rust query engine crashes unexpectedly.
// This is usually an internal Prisma issue, and the application process
// should be restarted.
const handlePrismaRustPanicError = (
  err: Prisma.PrismaClientRustPanicError,
): AppError => {
  return new AppError({
    message: err.message,
    statusCode: 500,
    code: "PRISMA_RUST_PANIC_ERROR",
    isOperational: true,
  });
};

// PrismaClientInitializationError
// Thrown when Prisma fails to initialize the query engine or establish
// a connection to the database during startup.
// Examples: invalid DATABASE_URL, database server is offline,
// authentication failure, or network connectivity issues.
const handlePrismaInitializationError = (
  err: Prisma.PrismaClientInitializationError,
): AppError => {
  return new AppError({
    message: err.message,
    statusCode: 500,
    code: "PRISMA_INITIALIZATION_ERROR",
    isOperational: true,
  });
};

// PrismaClientValidationError
// Thrown when the Prisma query is invalid before it is sent to the database.
// Examples: missing required fields, incorrect data types, or invalid query arguments.
const handlePrismaValidationError = (
  err: Prisma.PrismaClientValidationError,
): AppError => {
  return new AppError({
    message: err.message,
    statusCode: 500,
    code: "PRISMA_VALIDATION_ERROR",
    isOperational: true,
  });
};

const sendErrorDev = (err: AppError, res: Response) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode, 
    code: err.code,
    // status: err.name || "error",
    message: err.message,
    // error: err,
    stack: err.stack
  });
};


const sendErrorProd = (err: AppError, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status:  err.statusCode, 
    message: err.message, 
    error: err
  });

}


export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let error = err;

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("known error");
    console.log(err.code);

    error = handlePrismaKnownError(err);
    return sendErrorDev(error, res);
  }

  return res.status(500).json({
    message: err.message,
  });
}
