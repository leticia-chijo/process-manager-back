import { processServices } from "@/services/process.services"
import { ProcessBody } from "@/types/process.types"
import { isIdValid } from "@/utils/isIdValid"
import { Request, Response } from "express"
import httpStatus from "http-status"

export async function getProcesses(req: Request, res: Response) {
  const processs = await processServices.readAll()
  res.status(httpStatus.CREATED).send(processs)
}

export async function getProcessesNested(req: Request, res: Response) {
  const processs = await processServices.readAllNested()
  res.status(httpStatus.CREATED).send(processs)
}

export async function getProcessById(req: Request, res: Response) {
  const processId = Number(req.params.id)
  isIdValid(processId)

  const process = await processServices.readById(processId)
  res.status(httpStatus.OK).send(process)
}

export async function postProcess(req: Request, res: Response) {
  const body = req.body as ProcessBody

  const createdProcess = await processServices.create(body)
  res.status(httpStatus.CREATED).send(createdProcess)
}

export async function putProcessById(req: Request, res: Response) {
  const body = req.body as ProcessBody
  const processId = Number(req.params.id)
  isIdValid(processId)

  const updatedProcess = await processServices.updateById(processId, body)
  res.status(httpStatus.OK).send(updatedProcess)
}

export async function deleteProcessById(req: Request, res: Response) {
  const processId = Number(req.params.id)
  isIdValid(processId)

  await processServices.deleteById(processId)
  res.sendStatus(httpStatus.NO_CONTENT)
}
