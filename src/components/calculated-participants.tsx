import { $calculatedParticipants } from '@/lib/shared-bill/calculated-values'
import { useStore } from '@nanostores/react'
import type { FC } from 'react'

export const CalculatedParticipants: FC = () => {
	const calculatedParticipants = useStore($calculatedParticipants)

	return (
		<section className="mx-auto max-w-screen-sm p-8">
			<div className="mb-2 flex w-full flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Calculated Participants</h2>
			</div>
			{calculatedParticipants.length > 0 ? (
				<table className=" w-full border border-gray-500">
					<thead className="font-semibold">
						<tr className="border border-gray-500">
							<td>Name</td>
							<td>Credit</td>
							<td>Debit</td>
							<td>Debit Balance</td>
						</tr>
					</thead>
					<tbody>
						{calculatedParticipants.map((participant, index) => (
							<tr className=" border border-t-gray-500" key={index}>
								<td>
									<p>{participant.name}</p>
								</td>
								<td>
									<p>{participant.contribution}</p>
								</td>
								<td>
									<p>{participant.billsSummed}</p>
								</td>
								<td>
									{participant.balance < 0 ? (
										<p>
											Has <span className="font-semibold">${Math.abs(participant.balance)}</span> in
											favour
										</p>
									) : (
										<p>
											Owes <span className="font-semibold">${participant.balance}</span>
										</p>
									)}
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
