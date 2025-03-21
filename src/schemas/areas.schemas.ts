import { CreateArea } from "@/types/areas.types"
import Joi from "joi"

export const areaSchema = Joi.object<CreateArea>({
  name: Joi.string().required().messages({
    "string.empty": "O nome da área não pode estar vazio.",
    "any.required": "O nome da área é obrigatório."
  })
})
