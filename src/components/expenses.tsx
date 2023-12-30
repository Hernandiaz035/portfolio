import { $accounts } from '@/lib/shared-bill/accounts'
import { $expenses } from '@/lib/shared-bill/expenses'
import { $participants } from '@/lib/shared-bill/participants'
import { useStore } from '@nanostores/react'
import type { FC } from 'react'

export const Expenses: FC = () => {
	const participants = useStore($participants)
	const accounts = useStore($accounts)
	const expenses = useStore($expenses)

	const addExpense = () => {
		$expenses.set([...expenses, { concept: '', account: null, participant: null, amount: 0 }])
	}

	const deleteExpense = (index: number) => {
		const newExpenses = [...expenses]
		newExpenses.splice(index, 1)
		$expenses.set(newExpenses)
	}

	const modifyExpenseConcept = (value: string, index: number) => {
		const newExpenses = [...expenses]
		newExpenses[index].concept = value
		$expenses.set(newExpenses)
	}

	const modifyExpenseAccount = (value: string, index: number) => {
		const newExpenses = [...expenses]
		const newAccount = accounts.find((account) => account.name === value)

		newExpenses[index].account = newAccount ?? null
		$expenses.set(newExpenses)
	}

	const modifyExpenseParticipant = (value: string, index: number) => {
		const newExpenses = [...expenses]

		const newParticipant = participants.find((participant) => participant.name === value)

		newExpenses[index].participant = newParticipant ?? null
		$expenses.set(newExpenses)
	}

	return (
		<section className="mx-auto max-w-screen-md p-8">
			<div className="mb-2 flex w-full flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Expenses</h2>
				<button
					className="rounded-md border border-gray-400 bg-gray-600 px-2 py-1 text-gray-100"
					onClick={addExpense}
				>
					Add Expense
				</button>
			</div>
			<table className=" w-full border border-gray-500">
				<thead className="font-semibold">
					<tr className="border border-gray-500">
						<td>
							<span className="pl-4">Concept</span>
						</td>
						<td>
							<span className="px-4">Account</span>
						</td>
						<td>
							<span className="px-4">Participants</span>
						</td>
						<td>
							<span className="px-4">Amount</span>
						</td>
						<td>
							<span className="px-4">Actions</span>
						</td>
					</tr>
				</thead>
				<tbody>
					{expenses.map((expense, index) => (
						<tr className=" border border-t-gray-500" key={index}>
							<td>
								<input
									className="w-full pl-4"
									type="select"
									name="expense-concept"
									value={expense.concept}
									onChange={(event) => {
										modifyExpenseConcept(event.currentTarget.value, index)
									}}
								/>
							</td>
							<td>
								<select
									name="expense-account"
									className="w-full pl-4"
									value={expense.account?.name}
									onChange={(event) => {
										modifyExpenseAccount(event.currentTarget.value, index)
									}}
								>
									<option value={undefined}>—</option>
									{accounts.map((account, accountIdx) => (
										<option key={accountIdx} value={account.name}>
											{account.name}
										</option>
									))}
								</select>
							</td>
							<td>
								<select
									name="expense-participant"
									className="w-full pl-4"
									value={expense.participant?.name}
									onChange={(event) => {
										modifyExpenseParticipant(event.currentTarget.value, index)
									}}
								>
									<option value={undefined}>—</option>
									{participants.map((participant, accountIdx) => (
										<option key={accountIdx} value={participant.name}>
											{participant.name}
										</option>
									))}
								</select>
							</td>
							<td>
								<p className="pl-4">{expense.amount}</p>
							</td>
							<td className="pl-4">
								<button
									className="my-1 rounded-md border border-gray-400 px-2 text-xs text-gray-700"
									onClick={() => deleteExpense(index)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}
