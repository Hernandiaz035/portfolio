import { type FC } from 'react'
import { Participants } from './participants'
import { Accounts } from './accounts'
import { Expenses } from './expenses'
import { CalCulatedAccounts } from './calculated-account'
import { CalculatedParticipants } from './calculated-participants'
import { useStore } from '@nanostores/react'
import { $accounts, type Account } from '@/lib/shared-bill/accounts'
import {
	$calculatedAccounts,
	$calculatedParticipants,
	type CalculatedAccount,
	type CalculatedParticipant
} from '@/lib/shared-bill/calculated-values'
import { getRandomId, round } from '@/lib/shared-bill/utils'
import { $expenses } from '@/lib/shared-bill/expenses'
import { $participants } from '@/lib/shared-bill/participants'

export const Tables: FC = () => {
	const accounts = useStore($accounts)
	const expenses = useStore($expenses)
	const participants = useStore($participants)
	const calculatedAccounts = useStore($calculatedAccounts)

	const calculateAccounts = async () => {
		// Create temporary dictionary of Calculated accounts to search easily and return result (the key is the accountId)
		const accountsDict = accounts.reduce(
			(acc, account: Account): Record<string, CalculatedAccount> => {
				acc[account.id] = {
					id: getRandomId(),
					accountId: account.id,
					accountName: account.name,
					participantsCount: 0,
					billPerParticipant: 0,
					total: 0
				}
				return acc
			},
			{} as Record<string, CalculatedAccount>
		)

		// iterate each expense to get the total per account
		expenses.forEach((expense) => {
			if (!expense.account) {
				console.error("account doesn't exist")
				return
			}
			accountsDict[expense.account.id].total += expense.amount
		})

		// iterate each expense to get the quantity of participants
		participants.forEach((participant) => {
			participant.accounts.forEach((account) => {
				accountsDict[account.id].participantsCount += participant.shares
			})
		})

		const newCalculatedAccounts = Object.values(accountsDict)

		newCalculatedAccounts.forEach((account) => {
			const dividedValue = (account.total * 1.0) / account.participantsCount

			account.billPerParticipant = round(dividedValue)
		})

		$calculatedAccounts.set(newCalculatedAccounts)
	}

	const calculateParticipants = async () => {
		const participantsDict = participants.reduce(
			(acc, participant) => {
				acc[participant.id] = {
					id: getRandomId(),
					participantId: participant.id,
					name: participant.name,
					contribution: 0,
					billsSummed: 0,
					balance: 0
				}

				return acc
			},
			{} as Record<string, CalculatedParticipant>
		)

		expenses.forEach((expense) => {
			if (!expense.account) {
				console.error("account doesn't exist")
				return
			}
			participantsDict[expense.participant!.id].contribution += expense.amount
		})

		participants.forEach((participant) => {
			const relatedAccounts = participant.accounts.map((account) => account.id)
			const bills = calculatedAccounts
				.filter((account) => relatedAccounts.includes(account.accountId))
				.map((it) => it.billPerParticipant)

			const totalBill = bills.reduce((acc, it) => acc + it, 0)

			participantsDict[participant.id].billsSummed = round(totalBill * participant.shares)
			participantsDict[participant.id].balance = round(
				participantsDict[participant.id].billsSummed - participantsDict[participant.id].contribution
			)
		})

		const sortedParticipants = Object.values(participantsDict).toSorted(
			(a, b) => a.balance - b.balance
		)

		$calculatedParticipants.set(Object.values(sortedParticipants))
	}

	const calculate = async () => {
		await calculateAccounts()
		await calculateParticipants()
	}

	return (
		<>
			<Participants />
			<Accounts />
			<Expenses />

			<div className="mx-auto my-4 h-1 w-full max-w-screen-lg rounded-full bg-gray-500" />

			<div className="flex flex-row items-center justify-center">
				<button
					className="rounded-md border border-gray-400 bg-blue-600 px-2 py-1 text-gray-100"
					onClick={calculate}
				>
					Calculate
				</button>
			</div>

			<CalCulatedAccounts />
			<CalculatedParticipants />
		</>
	)
}
