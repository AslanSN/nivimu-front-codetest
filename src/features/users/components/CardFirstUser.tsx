import { Card } from 'antd'
import PropTypes from 'prop-types'

// Proptypes to be received
const CardProptypes = {
	firstUser: PropTypes.object,
}

type CardPropsTyped = PropTypes.InferProps<typeof CardProptypes>
/**
 * ! React Component
 * * Creates an Ant Design card that always renders the first user from store.users.people
 * ? Imported by: Users.tsx
 * @param props - fistUser
 * @returns
 */
const CardFirstUser: React.FC<CardPropsTyped> = (props: any) => (
	<Card title='First User!'>
		<ul>
			<li>
				<h4>Name:</h4>
				<span>{props.firstUser?.name || 'First User'}</span>
			</li>
			<li>
				<h4>Email:</h4>
				<span>{props.firstUser?.email || 'Email@burns.com'} </span>
			</li>
			<li>
				<h4>City:</h4>
				<span>{props.firstUser?.city || 'THE WORLD'} </span>
			</li>
		</ul>
	</Card>
)

export default CardFirstUser
