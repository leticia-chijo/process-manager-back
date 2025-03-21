import { AreaBody } from "@/types/areas.types"
import Joi from "joi"

export const areaSchema = Joi.object<AreaBody>({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "A área deve ser um texto.",
    "string.empty": "A área não pode estar vazio.",
    "string.min": "A área deve ter pelo menos {#limit} caracteres.",
    "string.max": "A área deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome da área é obrigatório."
  })
})
