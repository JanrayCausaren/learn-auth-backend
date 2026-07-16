import { type Request, type Response, type NextFunction } from "express";
import z from "zod";
import { errorResponse } from "../utils/error";

const requestSchema = z.object({
  body: z.any().optional(),
  params: z.any().optional(),
  query: z.any().optional(),
});

export type RequestSchema = z.infer<typeof requestSchema>;

export const validateRequest = (schema: z.ZodType<RequestSchema>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return errorResponse({
        res,
        statusCode: 400,
        message: "Validation failed from middleware",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    // if (!result.success) {
    //   return errorResponse({
    //     res,
    //     statusCode: 400,
    //     message: "Validation failed from",
    //     errors: z.flattenError(result.error),
    //   });
    // }

    req.body = result.data.body ?? req.body;
    req.params = result.data.params ?? req.params;
    // req.query = result.data.query ?? req.query;

    next();
  };
};
