import { ColumnsType } from 'antd/es/table'
import { User, Filter } from '../../types/usersTypes'

export const columnCreator = (
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
			defaultSortOrder: 'descend',
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
