import { docsServices } from "@/services/docs.services"
import { CreateDoc } from "@/types/docs.types"
import { isIdValid } from "@/utils/isIdValid"
import { Request, Response } from "express"
import httpStatus from "http-status"

export async function getDocs(req: Request, res: Response) {
  const docs = await docsServices.readAll()
  res.status(httpStatus.CREATED).send(docs)
}

export async function getDocById(req: Request, res: Response) {
  const docId = Number(req.params.id)
  isIdValid(docId)

  const doc = await docsServices.readById(docId)
  res.status(httpStatus.OK).send(doc)
}

export async function postDoc(req: Request, res: Response) {
  const body = req.body as CreateDoc

  const createdDoc = await docsServices.create(body)
  res.status(httpStatus.CREATED).send(createdDoc)
}

export async function putDocById(req: Request, res: Response) {
  const body = req.body as CreateDoc
  const docId = Number(req.params.id)
  isIdValid(docId)

  const updatedDoc = await docsServices.updateById(docId, body)
  res.status(httpStatus.OK).send(updatedDoc)
}

export async function deleteDocById(req: Request, res: Response) {
  const docId = Number(req.params.id)
  isIdValid(docId)

  await docsServices.deleteById(docId)
  res.sendStatus(httpStatus.NO_CONTENT)
}
