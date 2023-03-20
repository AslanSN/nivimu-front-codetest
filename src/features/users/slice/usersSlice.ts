import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Filter, FilterProps, User } from '../types/usersTypes'
import { fetchUsers } from '../api/usersAPI'
import { extractFiltersFromUsers, formatFiltersForAntDesign, userCreator } from './utils/usersSliceUtils'

export interface UserState {
	people: User[]
	filters: {
		namesFilters: Filter[]
		emailsDomainsFilters: Filter[]
		citiesFilters: Filter[]
	}
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
		getNameFilters: (state) => {
			const regex = /^[^\s]+/

			const props: FilterProps = {
				filterName: 'name',
				regex
			}
			const people = state.people

			if (state.filters?.namesFilters !== undefined) {
				const namesFilters = extractFiltersFromUsers(
					people,
					props.filterName,
					props.regex
				)

				state.filters.namesFilters = formatFiltersForAntDesign(namesFilters)

			}
		}
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

export default usersSlice.reducer
