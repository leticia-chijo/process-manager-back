import prisma from "@/database/database"
import { DocBody } from "@/types/docs.types"

async function create(doc: DocBody) {
  return prisma.doc.create({
    data: { ...doc }
  })
}

async function readAll() {
  return prisma.doc.findMany()
}

async function readById(id: number) {
  return prisma.doc.findUnique({
    where: { id }
  })
}

async function updateById(id: number, doc: DocBody) {
  return prisma.doc.update({
    where: { id },
    data: { ...doc }
  })
}

async function deleteById(id: number) {
  return prisma.doc.delete({
    where: { id }
  })
}

async function findByName(doc: DocBody) {
  return prisma.doc.findFirst({
    where: { name: doc.name }
  })
}

async function findById(id: number) {
  return prisma.doc.findUnique({
    where: { id }
  })
}

export const docsRepository = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
  findByName,
  findById
}
