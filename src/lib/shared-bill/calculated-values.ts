import { atom } from 'nanostores'

export type CalculatedAccount = {
	id: string
	accountId: string
	accountName: string
	total: number
	participantsCount: number
	billPerParticipant: number
}

export const $calculatedAccounts = atom<CalculatedAccount[]>([])

export type CalculatedParticipant = {
	id: string
	participantId: string
	name: string
	contribution: number
	billsSummed: number
	balance: number
}

export const $calculatedParticipants = atom<CalculatedParticipant[]>([])
