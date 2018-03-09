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
import VideoPlayer from '../components/VideoPlayer'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
}

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
				this.setState({
					mp4Source: `https://ctvod.run/ctv/guestmod/${res.name
						.replace(/[^\w\s]/gi, '')
						.replace(/\s+/g, '.')
						.toLowerCase()}.s${seasonNumber}e${episodeNumber}.mp4`,
					mkvSource: `https://ctvod.run/ctv/guestmod/${res.name
						.replace(/[^\w\s]/gi, '')
						.replace(/\s+/g, '.')
						.toLowerCase()}.s${seasonNumber}e${episodeNumber}.mkv`
				})
			})


		}
		if (this.props.match.path.includes('movie')) {
			const { id } = this.props.match.params
			tmdb.movieInfo({ id }, (err, res) => {
				this.setState({
					info: res,
					mp4Source:
						'https://ctvod.run/ctv/guestmod/' +
						res.title
							.replace(/[^\w\s]/gi, '')
							.replace(/\s+/g, '.')
							.toLowerCase() +
						'.mp4',
					mkvSource:
						'https://ctvod.run/ctv/guestmod/' +
						res.title
							.replace(/[^\w\s]/gi, '')
							.replace(/\s+/g, '.')
							.toLowerCase() +
						'.mkv'
				})
			})
		}
	}
	render() {
		const { classes } = this.props
		const { info } = this.state
			if (this.state.mp4Source && this.state.mkvSource) {
				return (
					<div className={classes.root}>
						<AppBar position="static" style={{zIndex: 3, position: 'relative'}}>
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
						<VideoPlayer>
							<source src={this.state.mp4Source} type="video/mp4" />
							<source src={this.state.mkvSource} />
							Either this movie is not available or you need to uprgade your
							browser to the latest version of Chrome
						</VideoPlayer>
					</div>

				)
			} else {
				return (
					<div className={classes.root}>
						<AppBar position="static" style={{zIndex: 3, position: 'relative'}}>
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
