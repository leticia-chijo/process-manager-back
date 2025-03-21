export type AppError = {
  type: AppErrorTypes
  message: string
}

export type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema"
