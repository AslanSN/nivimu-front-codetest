import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Filter, User } from '../types/usersTypes'
import { fetchUsers } from '../api/usersAPI'
import { userCreator } from './utils/usersSliceUtils'

export interface UserState {
	people: User[]
	filters: {
		names: Filter[]
		emailsDomains: Filter[]
		cities: Filter[]
	}
	url: string
	loading: boolean
	error: string
}

const initialState: UserState = {
	people: [],
	filters: {
		names: [],
		emailsDomains: [],
		cities: [],
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
