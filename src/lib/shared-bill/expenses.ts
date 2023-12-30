import type { Account } from './accounts'
import type { Participant } from './participants'

export type Expense = {
	concept: string
	account: Account
	participant: Participant
	amount: number
}
