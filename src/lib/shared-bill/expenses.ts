import { persistentAtom } from '@nanostores/persistent'
import type { Account } from './accounts'
import type { Participant } from './participants'

export type Expense = {
	id: string
	concept: string
	account: Account | null
	participant: Participant | null
	amount: number
}

export const $expenses = persistentAtom<Expense[]>('expenses', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})
