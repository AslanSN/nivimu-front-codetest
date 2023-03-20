//Classes - Constructors
// import { UserClass } from '../../types/usersClasses';
// Types
import type { RawUser, User } from '../../types/usersTypes';

export const userCreator = (object: RawUser): User => {
	const { id, name, email } = object
	const { city } = object.address

	const user: User = {
		key: id,
		name,
		email,
		city

	}
	return user
}