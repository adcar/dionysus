import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui-icons/ArrowBack'
import { withRouter } from 'react-router-dom'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

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
	componentDidMount() {
		if (this.props.match.path.includes('show')) {
			const { id, season_number, episode_number } = this.props.match.params
			tmdb.tvEpisodeInfo({ id, season_number, episode_number }, (err, res) => {
				this.setState({
					info: res
				})
			})
			tmdb.tvInfo({ id }, (err, res) => {
				let seasonNumber = ''
				let episodeNumber = ''
				if (season_number < 10) {
					seasonNumber = `0${season_number}`
				} else {
					seasonNumber = `${season_number}`
				}
				if (episode_number < 10) {
					episodeNumber = `0${episode_number}`
				} else {
					episodeNumber = `${episode_number}`
				}
				fetch(
					`https://dionysus-api.herokuapp.com/show/${res.name.replace(
						/[^\w\s]/gi,
						''
					)}/${season_number}/${episode_number}`
				)
					.then(res => res.json())
					.then(json =>
						this.setState({
							source: json.openload[0]
						})
					)
			})
		}
		if (this.props.match.path.includes('movie')) {
			const { id } = this.props.match.params
			tmdb.movieInfo({ id }, (err, res) => {
				fetch(
					`https://dionysus-api.herokuapp.com/movie/${
						res.title
					}/${res.release_date.slice(0, 4)}`
				)
					.then(res => res.json())
					.then(json =>
						this.setState({
							info: res,
							source: json.openload[0]
						})
					)
			})
		}
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
						<iframe
							title="Video"
							src={this.state.source}
							className={classes.player}
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
