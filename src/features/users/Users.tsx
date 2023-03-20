// React
import { useEffect } from 'react'
// Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// Ant Design
import { Table } from 'antd'
//Functions
import {
	fetchUsersAsync,
	getCitiesFilters,
	getEmailDomainFilters,
	getNameFilters,
} from './slice/usersSlice'
import { columnCreator } from './slice/utils/usersComponentHelpers'
//Styles
import './styles.css'

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	let isAwaken = false

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		isAwaken ? (isAwaken = true) : dispatch(fetchUsersAsync())
	}, [])

	const { users } = useAppSelector((state) => state)
	const { people } = users
	useEffect(() => {
		dispatch(getNameFilters())
		dispatch(getEmailDomainFilters())
		dispatch(getCitiesFilters())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [people])

	const { namesFilters, emailsDomainsFilters, citiesFilters } = users.filters

	return (
		<>
			{users.loading && <h3>Loading...</h3>}
			{!users.loading && users.error ? alert(users.error) : null}
			<div>
				<Table
					dataSource={people}
					columns={columnCreator(
						namesFilters,
						emailsDomainsFilters,
						citiesFilters
					)}
				/>
			</div>
		</>
	)
}

export default Users
