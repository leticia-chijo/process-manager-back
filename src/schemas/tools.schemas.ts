import { ToolBody } from "@/types/tools.types"
import Joi from "joi"

export const toolSchema = Joi.object<ToolBody>({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "O nome da ferramenta deve ser um texto.",
    "string.empty": "O nome da ferramenta não pode estar vazio.",
    "string.min": "O nome da ferramenta deve ter pelo menos {#limit} caracteres.",
    "string.max": "O nome da ferramenta deve ter no máximo {#limit} caracteres.",
    "any.required": "O nome da ferramenta é obrigatório."
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
