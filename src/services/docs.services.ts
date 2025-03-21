import { conflictError, notFoundError } from "@/errors/errors"
import { docsRepository } from "@/repositories/docs.repository"
import { DocBody } from "@/types/docs.types"

async function verifyIdExists(id: number) {
  const idExists = await docsRepository.findById(id)
  if (!idExists) throw notFoundError("Esse documento não existe!")
}

async function verifyConflict(doc: DocBody) {
  const nameExists = await docsRepository.findByName(doc)
  if (nameExists) throw conflictError("Já existe um documento com esse nome!")
}

async function create(doc: DocBody) {
  await verifyConflict(doc)
  return await docsRepository.create(doc)
}

async function readAll() {
  return await docsRepository.readAll()
}

async function readById(id: number) {
  await verifyIdExists(id)
  return await docsRepository.readById(id)
}

async function updateById(id: number, doc: DocBody) {
  await verifyIdExists(id)
  await verifyConflict(doc)
  return await docsRepository.updateById(id, doc)
}

async function deleteById(id: number) {
  await verifyIdExists(id)
  return await docsRepository.deleteById(id)
}

export const docsServices = {
  create,
  readAll,
  readById,
  updateById,
  deleteById
}
