import prisma from "@/database/database"
import { CreateDoc } from "@/types/docs.types"

async function create(doc: CreateDoc) {
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

async function updateById(id: number, doc: CreateDoc) {
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

async function findByName(doc: CreateDoc) {
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
