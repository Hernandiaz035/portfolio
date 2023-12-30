import { type FC } from 'react'
import { Participants } from './participants'
import { Accounts } from './accounts'
import { Expenses } from './expenses'

export const Tables: FC = () => {
	return (
		<>
			<Participants />

			<Accounts />

			<Expenses />
		</>
	)
}
