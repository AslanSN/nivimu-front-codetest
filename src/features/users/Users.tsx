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
		// users.firstUser = extra.currentDataSource[0]
		// console.log('params', extra.currentDataSource[0])
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
					<Card title='First User!'>
						<ul>
							<li>
								<h4>Name:</h4>
								<span>{firstUser?.name || 'First User'}</span>
							</li>
							<li>
								<h4>Email:</h4>
								<span>{firstUser?.email || 'Email@burns.com'} </span>
							</li>
							<li>
								<h4>City:</h4>
								<span>
								{firstUser?.city || 'THE WORLD'}{' '}
								</span>
							</li>
						</ul>
					</Card>
				</div>
			</div>
		</>
	)
}

export default Users
