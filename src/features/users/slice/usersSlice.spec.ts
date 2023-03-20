import { store } from '../../../app/store'
import { FilterProps } from '../types/usersTypes'
import { fetchUsersAsync } from './usersSlice'
import {
	extractFiltersFromUsers,
	formatFiltersForAntDesign,
} from './utils/usersSliceUtils'

describe('Users reducer', () => {
	it('should fetch all users data from API', async () => {
		await store.dispatch(fetchUsersAsync())
		const actual = store.getState().users.people

		expect(actual.length).toBe(10)
	})

	describe('utils', () => {
		describe('raw filters getters', () => {
			it('should extract raw filters from users', () => {
				const people = store.getState().users.people
				const regex = /^[^\s]+/
				const props: FilterProps = {
					filterName: 'name',
					regex,
				}

				const rawFilters = extractFiltersFromUsers(
					people,
					props.filterName,
					props.regex
				)

				expect(rawFilters.length).toBeGreaterThan(3)
			})

			it('should extract raw filters from users without regex', () => {
				const people = store.getState().users.people
				const rawFilters = extractFiltersFromUsers(people, 'city')

				expect(rawFilters.length).toBeGreaterThan(3)
			})
		})
		it('should format the filter to be readeble for Ant Design Table', () => {
			const people = store.getState().users.people
			const rawFilters = extractFiltersFromUsers(people, 'city')
			const formatedFilter = formatFiltersForAntDesign(rawFilters)

			expect(Object.keys(formatedFilter[0])).toEqual(['text', 'value'])
		})
	})
})
