import { areaServices } from "@/services/areas.services"
import { CreateArea } from "@/types/areas.types"
import { isIdValid } from "@/utils/isIdValid"
import { Request, Response } from "express"
import httpStatus from "http-status"

export async function getAreas(req: Request, res: Response) {
  const areas = await areaServices.readAll()
  res.status(httpStatus.CREATED).send(areas)
}

export async function getAreaById(req: Request, res: Response) {
  const areaId = Number(req.params.id)
  isIdValid(areaId)

  const area = await areaServices.readById(areaId)
  res.status(httpStatus.OK).send(area)
}

export async function postArea(req: Request, res: Response) {
  const body = req.body as CreateArea

  const createdArea = await areaServices.create(body)
  res.status(httpStatus.CREATED).send(createdArea)
}

export async function putAreaById(req: Request, res: Response) {
  const body = req.body as CreateArea
  const areaId = Number(req.params.id)
  isIdValid(areaId)

  const updatedArea = await areaServices.updateById(areaId, body)
  res.status(httpStatus.OK).send(updatedArea)
}

export async function deleteAreaById(req: Request, res: Response) {
  const areaId = Number(req.params.id)
  isIdValid(areaId)

  await areaServices.deleteById(areaId)
  res.sendStatus(httpStatus.NO_CONTENT)
}
