import { $calculatedAccounts } from '@/lib/shared-bill/calculated-values'
import { useStore } from '@nanostores/react'
import type { FC } from 'react'

export const CalCulatedAccounts: FC = () => {
	const calCulatedAccounts = useStore($calculatedAccounts)

	return (
		<section className="mx-auto max-w-screen-sm p-8">
			<div className="mb-2 flex w-full flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Calculated Accounts</h2>
			</div>
			{calCulatedAccounts.length > 0 ? (
				<table className=" w-full border border-gray-500">
					<thead className="font-semibold">
						<tr className="border border-gray-500">
							<td>Account</td>
							<td>Participants</td>
							<td>Bill per participant</td>
							<td>Total</td>
						</tr>
					</thead>
					<tbody>
						{calCulatedAccounts.map((account, index) => (
							<tr className=" border border-t-gray-500" key={index}>
								<td>
									<p>{account.accountName}</p>
								</td>
								<td>
									<p>{account.participantsCount}</p>
								</td>
								<td>
									<p>{account.billPerParticipant}</p>
								</td>
								<td>
									<p>{account.total}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Not calculated yet</p>
			)}
		</section>
	)
}
