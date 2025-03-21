import { teamsServices } from "@/services/teams.services"
import { CreateTeam } from "@/types/teams.types"
import { isIdValid } from "@/utils/isIdValid"
import { Request, Response } from "express"
import httpStatus from "http-status"

export async function getTeams(req: Request, res: Response) {
  const teams = await teamsServices.readAll()
  res.status(httpStatus.CREATED).send(teams)
}

export async function getTeamById(req: Request, res: Response) {
  const teamId = Number(req.params.id)
  isIdValid(teamId)

  const team = await teamsServices.readById(teamId)
  res.status(httpStatus.OK).send(team)
}

export async function postTeam(req: Request, res: Response) {
  const body = req.body as CreateTeam

  const createdTeam = await teamsServices.create(body)
  res.status(httpStatus.CREATED).send(createdTeam)
}

export async function putTeamById(req: Request, res: Response) {
  const body = req.body as CreateTeam
  const teamId = Number(req.params.id)
  isIdValid(teamId)

  const updatedTeam = await teamsServices.updateById(teamId, body)
  res.status(httpStatus.OK).send(updatedTeam)
}

export async function deleteTeamById(req: Request, res: Response) {
  const teamId = Number(req.params.id)
  isIdValid(teamId)

  await teamsServices.deleteById(teamId)
  res.sendStatus(httpStatus.NO_CONTENT)
}
