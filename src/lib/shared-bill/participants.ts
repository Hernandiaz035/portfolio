import { persistentAtom } from '@nanostores/persistent'
import type { Account } from './accounts'

export type Participant = {
	id: string
	name: string
	shares: number
	accounts: Account[]
}

const dataParticipants = [
	{
		name: 'Paola + Ivan',
		shares: 2
	},
	{
		name: 'Felipe + Nica',
		shares: 2
	},
	{
		name: 'Flor',
		shares: 1
	},
	{
		name: 'Brayan + Natalia',
		shares: 2
	},
	{
		name: 'Stefi + Brother',
		shares: 2
	},
	{
		name: 'Kevin',
		shares: 1
	},
	{
		name: 'Mexican',
		shares: 1
	},
	{
		name: 'Freddy + brother',
		shares: 2
	},
	{
		name: 'Santiago + Johana',
		shares: 2
	},
	{
		name: 'Liz',
		shares: 1
	}
]

export const $participants = persistentAtom<Participant[]>('participants', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})
