// React
import { useEffect } from 'react'
// Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// Ant Design
import { Table } from 'antd'
//Functions
import { fetchUsersAsync } from './slice/usersSlice'
import { columnCreator } from './slice/utils/usersComponentHelpers'
import { ColumnsType } from 'antd/es/table'
import { User } from './types/usersTypes'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	let isAwaken = false

	useEffect(() => {
		isAwaken ? (isAwaken = true) : dispatch(fetchUsersAsync())
	}, [])

	const { users } = useAppSelector((state) => state)
	const { people } = users
	useEffect(() => {
		console.log(people)
	}, [people])

	return (
		<>
			{users.loading && <h3>Loading...</h3>}
			{!users.loading && users.error ? alert(users.error) : null}
			<div>
				<Table dataSource={people} columns={columnCreator()} />
			</div>
		</>
	)
}

export default Users
