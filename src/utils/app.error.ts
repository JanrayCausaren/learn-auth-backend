// interface AppErrorOptions {
//   message: string;
//   statusCode: number;
//   code: string;
//   isOperational?: boolean;
//   errors?: unknown; //
// }

// export class AppError extends Error {
//   statusCode: number;
//   code: string;
//   isOperational: boolean;
//   errors?: unknown; //

//   constructor(
//     message: string,
//     statusCode: number,
//     code: string,
//     isOperational = true,
//     errors?: unknown, //
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.code = code;
//     this.isOperational = isOperational;
//     this.errors = errors;
//     AppError.captureStackTrace(this, this.constructor);
//   }
// }

interface AppErrorOptions {
  message: string;
  statusCode: number;
  code?: string;
  isOperational?: boolean;
  errors?: unknown;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string | undefined;
  public readonly isOperational: boolean;
  public readonly errors: unknown | undefined;

  constructor({
    message,
    statusCode,
    code,
    isOperational = true,
    errors,
  }: AppErrorOptions) {          
    super(message);

    this.statusCode = statusCode;
    this.code = code ?? undefined;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}


export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super({ message, statusCode: 404, code: "NOT_FOUND" });
  }    
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super({ message, statusCode: 400, code: "BAD_REQUEST" });
  }
}  


export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super({ message, statusCode: 401, code: "UNAUTHORIZED" });
  }
}

