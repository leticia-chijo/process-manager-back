import { CreateTool } from "@/types/tools.types"
import Joi from "joi"

export const toolSchema = Joi.object<CreateTool>({
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
  }),
  image: Joi.string().uri().required().messages({
    "string.base": "A imagem deve ser um texto.",
    "string.empty": "A imagem não pode estar vazia.",
    "string.uri": "A imagem deve ser uma URL válida.",
    "any.required": "A imagem é obrigatória."
  })
})
