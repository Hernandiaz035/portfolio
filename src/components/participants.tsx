import { $participants } from '@/lib/shared-bill/participants'
import { getRandomId } from '@/lib/shared-bill/utils'
import { useStore } from '@nanostores/react'
import { type FC, type ChangeEvent, type MouseEvent } from 'react'

export const Participants: FC = () => {
	const participants = useStore($participants)

	const addParticipant = () => {
		$participants.set([...participants, { name: '', shares: 0, id: getRandomId() }])
	}

	const deleteParticipant = (event: MouseEvent<HTMLButtonElement>, index: number) => {
		event.preventDefault()
		const newParticipants = [...participants]
		newParticipants.splice(index, 1)
		$participants.set(newParticipants)
	}

	const modifyParticipantName = (event: ChangeEvent<HTMLInputElement>, index: number) => {
		const newParticipants = [...participants]
		const newName = event.currentTarget.value.trim()
		newParticipants[index].name = newName

		$participants.set(newParticipants)
	}

	const modifyParticipantShares = (event: ChangeEvent<HTMLInputElement>, index: number) => {
		const newParticipants = [...participants]
		const newValue = event.currentTarget.value
		const newValueParsed = Number.parseFloat(newValue)
		newParticipants[index].shares = newValueParsed

		if (newValue === '' || newValue === '0' || Number.isNaN(newValueParsed)) {
			newParticipants[index].shares = 0
		}

		$participants.set(newParticipants)
	}

	const calculateTotal = () => participants.reduce((acc, item) => acc + item.shares, 0)

	return (
		<section className="mx-auto max-w-screen-sm p-8">
			<div className="mb-2 flex w-full flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Participants</h2>
				<button
					className="rounded-md border border-gray-400 bg-gray-600 px-2 py-1 text-gray-100"
					onClick={addParticipant}
				>
					Add participant
				</button>
			</div>
			<table className=" w-full border border-gray-500">
				<thead className="font-semibold">
					<tr className="border border-gray-500">
						<td>Name</td>
						<td>Amount of Shares</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					{participants.map((participant, index) => (
						<tr className=" border border-t-gray-500" key={index}>
							<td>
								<input
									type="text"
									name="participant-name"
									value={participant.name}
									onChange={(event) => modifyParticipantName(event, index)}
								/>
							</td>
							<td>
								<input
									type="number"
									name="participant-shares"
									value={participant.shares}
									onChange={(event) => modifyParticipantShares(event, index)}
								/>
							</td>
							<td>
								<button
									className="my-1 rounded-md border border-gray-400 px-2 text-xs text-gray-700"
									onClick={(event) => deleteParticipant(event, index)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					<tr className="border border-t-gray-500 font-semibold">
						<td>TOTAL:</td>
						<td>{calculateTotal()}</td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}
