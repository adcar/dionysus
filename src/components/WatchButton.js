import React from 'react'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
const styles = theme => ({
	button: {
		marginBottom: theme.spacing.unit,
		marginLeft: theme.spacing.unit
	}
})

const WatchButton = props => {
	if (props.type === 'movie') {
		return (
			<Link to={`/watch/movie/${props.id}`} style={{ textDecoration: 'none' }}>
				<Button
					size="small"
					color="primary"
					variant="flat"
					className={props.classes.button}
				>
					Watch
				</Button>
			</Link>
		)
	} else if (props.type === 'tv') {
		return (
			<Link to={`/show/${props.id}`} style={{ textDecoration: 'none' }}>
				<Button
					size="small"
					color="primary"
					variant="flat"
					className={props.classes.button}
				>
					Watch
				</Button>
			</Link>
		)
	} else {
		return ''
	}
}
export default withStyles(styles)(WatchButton)
