//React
import { useEffect } from 'react'
//Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
//Functions
import { fetchUsersAsync } from './slice/usersSlice'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	let isAwaken = false

	useEffect(() => {
		isAwaken ? (isAwaken = true) : dispatch(fetchUsersAsync())
	}, [])

	const { users } = useAppSelector((state) => state)
	return (
		<>
			{users.loading && <h3>Loading...</h3>}
			{!users.loading && users.error ? alert(users.error) : null}
			<div>
				
			</div>
		</>
	)
}

export default Users
