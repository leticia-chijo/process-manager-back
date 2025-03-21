import { CreateTeam } from "@/types/teams.types"
import Joi from "joi"

export const teamSchema = Joi.object<CreateTeam>({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome não pode estar vazio.",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome é obrigatório."
  }),
  areaId: Joi.number().integer().positive().required().messages({
    "number.base": "O ID da área deve ser um número.",
    "number.integer": "O ID da área deve ser um número inteiro.",
    "number.positive": "O ID da área deve ser um número positivo.",
    "any.required": "O ID da área é obrigatório."
  })
})
