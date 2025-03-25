import { TeamBody } from "@/types/teams.types"
import Joi from "joi"

export const teamSchema = Joi.object<TeamBody>({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "O nome do time deve ser um texto.",
    "string.empty": "O nome do time não pode estar vazio.",
    "string.min": "O nome do time deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome do time deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome do time é obrigatório."
  }),
  areaId: Joi.number().integer().positive().required().messages({
    "number.base": "O ID da área deve ser um número.",
    "number.integer": "O ID da área deve ser um número inteiro.",
    "number.positive": "O ID da área deve ser um número positivo.",
    "any.required": "É obrigatório escolher uma área"
  })
})
