export const getRandomId = () => {
	return Math.random().toString(36).substring(2, 9)
}

export const round = (value: number, decimals: number = 2) => {
	return Number(Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals))
}
