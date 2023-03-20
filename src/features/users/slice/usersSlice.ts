import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Filter, FilterProps, User } from '../types/usersTypes'
import { fetchUsers } from '../api/usersAPI'
import {
	extractFiltersFromUsers,
	formatFiltersForAntDesign,
	userCreator,
} from './utils/usersSliceUtils'

export interface UserState {
	people: User[]
	filters: {
		namesFilters: Filter[]
		emailsDomainsFilters: Filter[]
		citiesFilters: Filter[]
	}
	firstUser: User | undefined
	url: string
	loading: boolean
	error: string
}

const initialState: UserState = {
	people: [],
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

export const fetchUsersAsync = createAsyncThunk(
	'users/fetchUsers',
	async () => {
		const response = await fetchUsers(initialState.url)
		return await response.json()
	}
)

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		findFirstUser: (state) => {
			const people = state.people

			const users = people.sort((a, b) => a.name.length - b.name.length)

			state.firstUser = users[0]
			// console.log(users[0])
		},
		tableChangesFirstUser: (state, action) => {
			state.firstUser = action.payload
		},
		getNameFilters: (state) => {
			const people = state.people
			const regex = /^[^\s]+/ // Gets the first name or title

			const props: FilterProps = {
				filterName: 'name',
				regex,
			}

			if (state.filters?.namesFilters !== undefined) {
				const namesFilters = extractFiltersFromUsers(
					people,
					props.filterName,
					props.regex
				)

				state.filters.namesFilters = formatFiltersForAntDesign(namesFilters)
			}
		},
		getEmailDomainFilters: (state) => {
			const people = state.people
			const regex = /\.([a-z]{2,})$/ // looks for domains (e.g.: .com)

			const props: FilterProps = {
				filterName: 'email',
				regex,
			}

			if (state.filters?.namesFilters !== undefined) {
				const emailFilters = extractFiltersFromUsers(
					people,
					props.filterName,
					props.regex
				)

				state.filters.emailsDomainsFilters =
					formatFiltersForAntDesign(emailFilters)
			}
		},
		getCitiesFilters: (state) => {
			const people = state.people

			if (state.filters?.namesFilters !== undefined) {
				const citiesFilters = extractFiltersFromUsers(people, 'city')

				state.filters.citiesFilters = formatFiltersForAntDesign(citiesFilters)
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsersAsync.pending, (state) => {
				state.loading = true
			})
			.addCase(fetchUsersAsync.fulfilled, (state, action) => {
				state.loading = false
				const users = action.payload.map(userCreator)
				state.people = users
			})
			.addCase(fetchUsersAsync.rejected, (state, action) => {
				state.loading = false
				state.error =
					action.error.message || 'Error not recognized. Fetch rejected'
			})
	},
})

export const {
	findFirstUser,
	tableChangesFirstUser,
	getNameFilters,
	getEmailDomainFilters,
	getCitiesFilters,
} = usersSlice.actions

export default usersSlice.reducer
