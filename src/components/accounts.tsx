import type { Account } from '@/lib/shared-bill/accounts'
import type { ChangeEvent, FC, MouseEvent } from 'react'

export type AccountsProps = {
	accounts: Account[]
	setAccounts: (accounts: Account[]) => void
}

export const Accounts: FC<AccountsProps> = ({ accounts, setAccounts }) => {
	const addAccount = () => {
		const newAccounts = [...accounts, { name: '', total: null }]
		setAccounts(newAccounts)
	}

	const deleteAccount = (index: number) => {
		const newAccounts = [...accounts]
		newAccounts.splice(index, 1)
		setAccounts(newAccounts)
	}

	const modifyAccountName = (event: ChangeEvent<HTMLInputElement>, index: number) => {
		const newAccounts = [...accounts]
		newAccounts[index].name = event.target.value
		setAccounts(newAccounts)
	}

	return (
		<section className="mx-auto max-w-screen-sm p-8">
			<div className="mb-2 flex w-full flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Accounts</h2>
				<button
					className="rounded-md border border-gray-400 bg-gray-600 px-2 py-1 text-gray-100"
					onClick={addAccount}
				>
					Add account
				</button>
			</div>
			<table className=" w-full border border-gray-500">
				<thead className="font-semibold">
					<tr className="border border-gray-500">
						<td>Name</td>
						<td>Amount of Shares</td>
						<td>actions</td>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account, index) => (
						<tr className=" border border-t-gray-500" key={index}>
							<td>
								<input
									type="text"
									name="participant-name"
									value={account.name}
									onChange={(event) => modifyAccountName(event, index)}
								/>
							</td>
							<td>
								<input type="text" name="participant-total" value={account.total ?? '-'} />
							</td>
							<td>
								<button
									className="my-1 rounded-md border border-gray-400 px-2 text-xs text-gray-700"
									onClick={() => deleteAccount(index)}
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
