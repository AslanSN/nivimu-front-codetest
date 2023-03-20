// Types
import { Key } from 'react'
import type { Filter, RawUser, User } from '../../types/usersTypes'

export const userCreator = (object: RawUser): User => {
	const { id, name, email } = object
	const { city } = object.address

	const user: User = {
		key: id,
		name,
		email,
		city,
	}
	return user
}

export const extractFiltersFromUsers = (
	array: User[],
	filterName: Key,
	regex?: RegExp
): string[] => {
	const filters: string[] = array
		.map((user): string =>
			regex
				? String(user[filterName]).match(regex)?.[0] ?? ''
				: String(user[filterName])
		)
		.filter((filterName, index, array) => array.indexOf(filterName) === index)
	return filters
}

const createFilter = (string: string): Filter => {
	const filter = {
		text: string,
		value: string,
	}

	return filter
}

export const formatFiltersForAntDesign = (array: string[]) =>
	array.map(createFilter)
