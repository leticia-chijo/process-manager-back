import { ProcessBody, ProcessTool } from "@/types/process.types"
import Joi from "joi"

const processToolSchema = Joi.object<ProcessTool>({
  id: Joi.number().integer().required().messages({
    "number.base": "O ID da ferramenta deve ser um número.",
    "number.integer": "O ID da ferramenta deve ser um número inteiro.",
    "any.required": "O ID da ferramenta é obrigatório."
  }),
  purpose: Joi.string().required().messages({
    "string.base": "O propósito de cada ferramenta deve ser um texto.",
    "any.required": "O propósito de cada ferramenta é obrigatório."
  })
})

export const processSchema = Joi.object<ProcessBody>({
  title: Joi.string().required().messages({
    "any.required": "O título do processo é obrigatório.",
    "string.empty": "O título do processo não pode estar vazio."
  }),
  teamId: Joi.number().integer().positive().required().messages({
    "any.required": "É obrigatório escolher um time. ",
    "number.base": "O ID do time deve ser um número.",
    "number.positive": "O ID do time deve ser positivo."
  }),
  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH").required().messages({
    "any.required": "A prioridade é obrigatória.",
    "any.only": "A prioridade deve ser 'LOW', 'MEDIUM' ou 'HIGH'."
  }),
  parentId: Joi.number().integer().positive().allow(null).messages({
    "number.base": "O ID do processo pai deve ser um número ou null.",
    "number.positive": "O ID do processo pai deve ser positivo ou null."
  }),
  docs: Joi.array().items(Joi.number().integer().positive()).messages({
    "array.base": "Os documentos devem estar em um array.",
    "number.base": "Cada ID de documento deve ser um número.",
    "number.positive": "Cada ID de documento deve ser positivo."
  }),
  tools: Joi.array().items(processToolSchema).required().messages({
    "array.base": "As ferramentas devem ser um array de objetos.",
    "any.required": "A lista de ferramentas é obrigatória."
  })
})
