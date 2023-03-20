// React
import { useEffect } from 'react'
// Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// Ant Design
import { Table } from 'antd'
//Functions
import { fetchUsersAsync } from './slice/usersSlice'
import { columnCreator } from './slice/utils/usersComponentHelpers'
//Styles
import './styles.css'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	let isAwaken = false

	useEffect(() => {
		isAwaken ? (isAwaken = true) : dispatch(fetchUsersAsync())
	}, [])

	const { users } = useAppSelector((state) => state)
	const { people } = users
	useEffect(() => {
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
