import { AppError, AppErrorTypes } from "@/types/error.types"
import httpStatus from "http-status"

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "conflict") return httpStatus.CONFLICT
  if (type === "not_found") return httpStatus.NOT_FOUND
  if (type === "unauthorized") return httpStatus.UNAUTHORIZED
  if (type === "wrong_schema") return httpStatus.UNPROCESSABLE_ENTITY

  return httpStatus.BAD_REQUEST
}

export function conflictError(message?: string): AppError {
  return { type: "conflict", message }
}

export function notFoundError(message?: string): AppError {
  return { type: "not_found", message }
}

export function unauthorizedError(message?: string): AppError {
  return { type: "unauthorized", message }
}

export function wrongSchemaError(message?: string): AppError {
  return { type: "wrong_schema", message }
}
