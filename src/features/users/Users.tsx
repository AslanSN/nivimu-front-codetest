// React
import { useEffect } from 'react'
// Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// Ant Design
import { Table, Card, TableProps } from 'antd'
//Functions
import {
	fetchUsersAsync,
	findFirstUser,
	getCitiesFilters,
	getEmailDomainFilters,
	getNameFilters,
	tableChangesFirstUser,
} from './slice/usersSlice'
import { columnCreator } from './slice/utils/usersComponentHelpers'
//Styles
import './styles.css'
import { User } from './types/usersTypes'
import CardFirstUser from './components/CardFirstUser'

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
		dispatch(findFirstUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [people])

	const { namesFilters, emailsDomainsFilters, citiesFilters } = users.filters
	const { firstUser } = users
	const onChange: TableProps<User>['onChange'] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		dispatch(tableChangesFirstUser(extra.currentDataSource[0]))
	}
	return (
		<>
			{users.loading && <h3>Loading...</h3>}
			{!users.loading && users.error ? alert(users.error) : null}
			<div className='container'>
				<div className='table'>
					<Table
						dataSource={people}
						columns={columnCreator(
							namesFilters,
							emailsDomainsFilters,
							citiesFilters
						)}
						onChange={onChange}
					/>
				</div>
				<div className='card'>
					<CardFirstUser firstUser={firstUser} />
				</div>
			</div>
		</>
	)
}

export default Users
