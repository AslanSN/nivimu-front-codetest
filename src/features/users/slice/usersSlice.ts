import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../types/usersTypes';
import { fetchUsers } from '../api/usersAPI';

export interface UserState {
	people: User[]
	url: string
	loading: boolean
	error: string
}

const initialState: UserState = {
	people: [],
	url: 'https://jsonplaceholder.typicode.com/users',
	loading: false,
	error: ''
}

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetchUsers(initialState.url)
	return await response.json()
})

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: () => { }
})

export default usersSlice.reducer