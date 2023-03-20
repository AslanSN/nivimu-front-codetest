
export interface RawUser {
	id: number
	name: string
	email: string
	address: {
		city: string
	}
}

export interface User {
	[key: string]: React.Key
	name: string
	email: string
	city: string
}

export interface Filter {
	text: string
	value: string,
}

export interface FilterProps {
	filterName: string,
	regex?: RegExp
}