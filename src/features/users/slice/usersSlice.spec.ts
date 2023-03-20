import { store } from "../../../app/store"
import { fetchUsersAsync } from './usersSlice';

describe("Users reducer", () => {
	it('should fetch all users data from API', async () => {
		await store.dispatch(fetchUsersAsync())
		const actual = store.getState().users.people

		expect(actual.length).toBe(10)
	})
})