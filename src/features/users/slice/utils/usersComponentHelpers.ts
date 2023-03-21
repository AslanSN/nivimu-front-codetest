import { ColumnsType } from 'antd/es/table'
import { User, Filter } from '../../types/usersTypes'

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
			onFilter: (value, record) => record.name.includes(value.toString()),
			defaultSortOrder: 'ascend',
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['descend'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			filters: emailsFilters,
			onFilter: (value, record) => record.email.includes(value.toString()),
			sorter: (a, b) => String(a.email).length - String(b.email).length,
			ellipsis: true,
		},
		{
			title: 'City',
			dataIndex: 'city',
			key: 'city',
			filters: citiesFilters,
			onFilter: (value, record) => record.city.includes(value.toString()),
			sorter: (a, b) => a.city.length - b.city.length,
			ellipsis: true,
		},
	]

	return columns
}
