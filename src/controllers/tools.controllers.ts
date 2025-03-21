import { toolsServices } from "@/services/tools.services"
import { ToolBody } from "@/types/tools.types"
import { isIdValid } from "@/utils/isIdValid"
import { Request, Response } from "express"
import httpStatus from "http-status"

export async function getTools(req: Request, res: Response) {
  const tools = await toolsServices.readAll()
  res.status(httpStatus.CREATED).send(tools)
}

export async function getToolById(req: Request, res: Response) {
  const toolId = Number(req.params.id)
  isIdValid(toolId)

  const tool = await toolsServices.readById(toolId)
  res.status(httpStatus.OK).send(tool)
}

export async function postTool(req: Request, res: Response) {
  const body = req.body as ToolBody

  const createdTool = await toolsServices.create(body)
  res.status(httpStatus.CREATED).send(createdTool)
}

export async function putToolById(req: Request, res: Response) {
  const body = req.body as ToolBody
  const toolId = Number(req.params.id)
  isIdValid(toolId)

  const updatedTool = await toolsServices.updateById(toolId, body)
  res.status(httpStatus.OK).send(updatedTool)
}

export async function deleteToolById(req: Request, res: Response) {
  const toolId = Number(req.params.id)
  isIdValid(toolId)

  await toolsServices.deleteById(toolId)
  res.sendStatus(httpStatus.NO_CONTENT)
}
