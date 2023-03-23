import { ColumnsType } from 'antd/es/table'
import { User, Filter } from '../../types/usersTypes'
import { sorter, onTableFilter } from './usersSliceUtils';

/**
 * * Creates an Array of Columns
 * * Each column has its personalized name and filter
 * @param namesFilters - Filter[]
 * @param emailsFilters - Filter[]
 * @param citiesFilters - Filter[]
 * @returns columns - User[ColumnsType]
 */
export const columnsCreator = (
	namesFilters: Filter[],
	emailsFilters: Filter[],
	citiesFilters: Filter[]
): ColumnsType<User> => {
	const columns: ColumnsType<User> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			filters: namesFilters,
			onFilter: (value, record) => onTableFilter(value, record, 'name'),
			defaultSortOrder: 'ascend',
			sorter: (a, b) => sorter(a, b, 'name'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			filters: emailsFilters,
			onFilter: (value, record) => onTableFilter(value, record, 'email'),
			sorter: (a, b) => sorter(a, b, 'email'),
			ellipsis: true,
		},
		{
			title: 'City',
			dataIndex: 'city',
			key: 'city',
			filters: citiesFilters,
			onFilter: (value, record) => onTableFilter(value, record, 'city'),
			sorter: (a, b) =>sorter(a, b, 'city'),
			ellipsis: true,
		},
	]

	return columns
}
