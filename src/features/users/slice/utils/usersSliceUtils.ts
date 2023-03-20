import { RawUser, User } from '../../types/usersTypes';
export const userCreator = (object: RawUser): User => {
	const { id, name, email } = object
	const { city } = object.address

	return new UserClass(id.toString(), name, email, city)
}