import type { Account } from '@/lib/shared-bill/accounts'
import type { Expense } from '@/lib/shared-bill/expenses'
import { dataParticipants } from '@/lib/shared-bill/participants'
import { useState, type FC, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import { Participants } from './participants'
import { Accounts } from './accounts'

export const Tables: FC = () => {
	const [accounts, setAccounts] = useState<Account[]>([])
	const [expenses, setExpenses] = useState<Expense[]>([])
	const [participants, setParticipants] = useState(dataParticipants)

	useEffect(() => {
		const storedParticipants = localStorage.getItem('participants')
		if (storedParticipants) {
			setParticipants(JSON.parse(storedParticipants))
		}
	}, [])

	useEffect(() => {
		const storedAccounts = localStorage.getItem('accounts')
		if (storedAccounts) {
			setAccounts(JSON.parse(storedAccounts))
		}
	}, [])

	useEffect(() => {
		const storedExpenses = localStorage.getItem('expenses')
	}, [])

	return (
		<>
			<Participants participants={participants} setParticipants={setParticipants} />

			<Accounts accounts={accounts} setAccounts={setAccounts} />
		</>
	)
}
