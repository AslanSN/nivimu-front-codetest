// Raw user for the users received from the API
export interface RawUser {
	id: number
	name: string
	email: string
	address: {
		city: string
	}
}
//Clean User interface, only relevant data
export interface User {
	[key: string]: React.Key
	name: string
	email: string
	city: string
}
//Ant Design format of each Filter
export interface Filter {
	text: string
	value: string,
}
//Filter properties interface for the filters getters
export interface FilterProps {
	filterName: string,
	regex?: RegExp
}