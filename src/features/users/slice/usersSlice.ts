import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types/usersTypes';

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

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: () => { }
})

export default usersSlice.reducer