//React
import { useEffect } from 'react';
//Redux
import { useAppDispatch } from '../../app/hooks';
//Functions
import { fetchUsersAsync } from './slice/usersSlice';

const Users: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchUsersAsync())
	})
	return (
		<>

		</>
)
}

export default Users