import { persistentAtom } from '@nanostores/persistent'

export type Account = {
	name: string
	total: number | null
}

export const $accounts = persistentAtom<Account[]>('accounts', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})
