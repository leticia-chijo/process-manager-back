import { DocBody } from "@/types/docs.types"
import Joi from "joi"

export const docSchema = Joi.object<DocBody>({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome não pode estar vazio.",
    "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome é obrigatório."
  }),
  link: Joi.string().uri().required().messages({
    "string.base": "O link deve ser um texto.",
    "string.empty": "O link não pode estar vazio.",
    "string.uri": "O link deve ser uma URL válida.",
    "any.required": "O link é obrigatório."
  })
})
