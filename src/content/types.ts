export type Role = {
	company: string
	location: string
	period: string
	title: string
	description: string
	highlights: string[]
}

export type Experience = Role[]

export type Project = {
	title: string
	description: string
	image: string
	imageAlt?: string
	tags: string[]
	links: {
		label: string
		url: string
	}[]
}
