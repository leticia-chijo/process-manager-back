import { errorTypeToStatusCode } from "@/errors/errors"
import { AppError } from "@/types/error.types"
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

export default function errorHandlerMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err)

  if ("type" in err && "message" in err) {
    let statusCode: number = errorTypeToStatusCode(err.type) || httpStatus.INTERNAL_SERVER_ERROR
    let message: string = err.message || "Internal Server Error"
    res.status(statusCode).send(message)
    return
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  return
}
