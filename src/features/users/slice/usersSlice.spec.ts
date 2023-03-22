//Store and Slice
import usersSlice from './usersSlice'
import { store } from '../../../app/store'
//Types
import { FilterProps, User } from '../types/usersTypes'
//Reducers and Thunks
import { fetchUsersAsync, findFirstUser, UserState } from './usersSlice'
import { userCreator } from './utils/usersSliceUtils'
//Utils functions
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

	describe('reducers', () => {
		it('should extract the first user', () => {
			const initialTestPeople: User[] = [
				{
					key: 1,
					name: 'Luke',
					email: 'Robles@oak.nice',
					city: 'San Petersburg',
				},
				{
					key: 2,
					name: 'The Ramones',
					email: 'heavy@forever.metal',
					city: 'Inferno',
				},
				{
					key: 3,
					name: 'Leia',
					email: 'han@solo.love',
					city: 'Alderaan',
				},
			]
			
			const initialTestUsers: UserState = {
				people: initialTestPeople,
				filters: {
					namesFilters: [],
					emailsDomainsFilters: [],
					citiesFilters: [],
				},
				firstUser: undefined,
				url: 'https://jsonplaceholder.typicode.com/users',
				loading: false,
				error: '',
			}

			const actual = usersSlice(initialTestUsers, findFirstUser())
			const expected: User = {
				key: 3,
				name: 'Leia',
				email: 'han@solo.love',
				city: 'Alderaan',
			}
			expect(actual.firstUser).toEqual(expected)
		})
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
