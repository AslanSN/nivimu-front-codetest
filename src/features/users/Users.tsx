// React
import { useEffect } from 'react'
// Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks'
// Ant Design
import { Table, TableProps } from 'antd'
// Types
import type { User } from './types/usersTypes'
// Slice Functions
import {
	fetchUsersAsync,
	findFirstUser,
	getCitiesFilters,
	getEmailDomainFilters,
	getNameFilters,
	tableChangesFirstUser,
} from './slice/usersSlice'
// Helpers
import { columnsCreator } from './slice/utils/usersComponentHelpers'
// Components
import CardFirstUser from './components/CardFirstUser'
// Styles
import './styles.css'

/**
 * ! React Component - Users
 * * Creates the main component of this app
 * ? Imported by: App.tsx
 * @returns React Component
 */
const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	let isAwaken = false
	// On Render...
	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		isAwaken ? (isAwaken = true) : dispatch(fetchUsersAsync())
	}, [])

	const { users } = useAppSelector((state) => state)
	const { people } = users
	// When "people" changes...
	useEffect(() => {
		dispatch(getNameFilters())
		dispatch(getEmailDomainFilters())
		dispatch(getCitiesFilters())
		dispatch(findFirstUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [people])

	const { namesFilters, emailsDomainsFilters, citiesFilters } = users.filters
	const { firstUser } = users

	// When antd Table changes...
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
						columns={columnsCreator(
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
