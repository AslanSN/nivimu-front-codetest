// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// Types
import type { Filter, FilterProps, User } from '../types/usersTypes'
// API
import { fetchUsers } from '../api/usersAPI'
// Utils
import {
	extractFiltersFromUsers,
	formatFiltersForAntDesign,
	userCreator,
} from './utils/usersSliceUtils'

// The people's name has been selected so as not to be misleading as it would users.users
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
/**
 * ! Thunk
 * * Fetchs Asyncronously all the users
 */
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
		/**
		 * * Finds the first user after sorting the main array
		 * @param state - store, people
		 */
		findFirstUser: (state) => {
			const people = state.people

			const users = people.sort((a, b) => a.name.length - b.name.length)

			state.firstUser = users[0]
		},
		/**
		 * * Stores the first user if the Table's onChange is triggered
		 * @param state - store, first user
		 * @param action - First user from antd Table
		 */
		tableChangesFirstUser: (state, action) => {
			state.firstUser = action.payload
		},
				/**
		 * * Finds the common and unique Firsts names from people
		 * * Formats the filters to be understanded by Ant Design Table Columns
		 * * Stores the formated filters on users.filters.namesFilters
		 * @param state - store, people
		 */
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
				/**
		 * * Finds the common and unique Domains from people's emails
		 * * Formats the filters to be understanded by Ant Design Table Columns
		 * * Stores the formated filters on users.filters.emailsDomainFilters
		 * @param state - store, people
		 */
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
		/**
				 * * Finds the common and unique cities' names from people
		 * * Formats the filters to be understanded by Ant Design Table Columns
		 * * Stores the formated filters on users.filters.citiesFilters
		 * @param state - store, people
		 */
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
					/**
			 * * Handles the loading event from fetching thunk
			 */
			.addCase(fetchUsersAsync.pending, (state) => {
				state.loading = true
			})
						/**
			 * * Handles fulfilled fetching Thunk
			 * * Formats the users
			 * * Stores the users received
			 */
			.addCase(fetchUsersAsync.fulfilled, (state, action) => {
				state.loading = false
				const users = action.payload.map(userCreator)
				state.people = users
			})
						/**
			 * * Handles Rejected fetching thunk
			 * * Stores the error to be desplayed
			 */
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
