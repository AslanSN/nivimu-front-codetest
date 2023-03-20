import { User } from './usersTypes'
export class UserClass implements User {
	[key: string]: React.Key
	name: string
	email: string
	city: string

	constructor(key: string, name: string, email: string, city: string) {
		this.key = key
		this.name = name
		this.email = email
		this.city = city
	}
}
