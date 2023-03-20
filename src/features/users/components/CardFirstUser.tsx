import { Card } from 'antd'
import PropTypes from 'prop-types'

const CardProptypes = {
	firstUser: PropTypes.object,
}

type CardPropsTyped = PropTypes.InferProps<typeof CardProptypes>

const CardFirstUser: React.FC<CardPropsTyped> = (props: any) => {
	console.log(props)
	return (
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
}
export default CardFirstUser
