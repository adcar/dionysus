import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'
import { withRouter, Route } from 'react-router-dom'
import WatchShow from './WatchShow'
import WatchMovie from './WatchMovie'
const styles = theme => ({
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	playerWrapper: {
		marginTop: theme.spacing.unit * 3,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	player: {
		border: 'none',
		margin: '0 auto',
		width: '71vw',
		height: 'calc(71vw * 9/16)'
	}
})

class Watch extends Component {
	constructor() {
		super()
		this.state = {
			info: {}
		}
	}
	handleBackButton() {
		this.props.history.goBack()
	}

	render() {
		const { classes } = this.props
		const { info } = this.state
		if (true) {
			return (
				<div className={classes.root}>
					<AppBar position="static" style={{ zIndex: 3, position: 'relative' }}>
						<Toolbar>
							<IconButton
								className={classes.menuButton}
								color="inherit"
								aria-label="Menu"
								onClick={this.handleBackButton.bind(this)}
							>
								<ArrowBack />
							</IconButton>
							<Typography
								variant="title"
								color="inherit"
								className={classes.flex}
							>
								{info.name || info.title}
							</Typography>
						</Toolbar>
					</AppBar>
					<div className={classes.playerWrapper}>
						<Route path="/watch/movie/:id" component={WatchMovie} />
						<Route
							path="/watch/show/:id/:season_number/:episode_number"
							component={WatchShow}
						/>
					</div>
				</div>
			)
		}
	}
}

Watch.propTypes = {
	classes: PropTypes.object.isRequired
}

const wrappedWatch = withStyles(styles)(Watch)
export default withRouter(wrappedWatch)
