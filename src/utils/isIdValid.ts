import { wrongSchemaError } from "@/errors/errors"

export function isIdValid(id: any) {
  if (isNaN(id) || id < 0) {
    throw wrongSchemaError("O id precisa ser um número maior que 0")
  }
}
