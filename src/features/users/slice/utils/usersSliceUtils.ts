// Types
import type { Key } from 'react'
import type { Filter, RawUser, User } from '../../types/usersTypes'
/**
 * ! Util
 * * Correctly formats a User's data from Raw Users
 * @param object
 * @returns object - User
 */
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

export const sorter = (a: User, b: User, name: string): number =>
	a[name].toString().localeCompare(b[name].toString())

export const onTableFilter = (
	value: string | number | boolean,
	record: User,
	name: string
): boolean => record[name].toString().includes(value.toString())
/**
 * ! Util
 * * Extracts filters (unique and common properties) from people - User[]
 * @param array
 * @param filterName
 * @param regex
 * @returns raw filters - string[]
 */
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
/**
 * ! Util
 * * Formats the Filter from a string
 * @param string
 * @returns
 */
const createFilter = (string: string): Filter => {
	const filter = {
		text: string,
		value: string,
	}

	return filter
}
/**
 * ! Util
 * * Iterates the raw filters' array to format each one.
 * * Depends on createFilter (formatter) function
 * @param array
 * @returns
 */
export const formatFiltersForAntDesign = (array: string[]) =>
	array.map(createFilter)
