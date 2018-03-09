import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import PlayArrow from 'material-ui-icons/PlayArrow'

const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const styles = theme => ({
	homePage: {
		position: 'relative',
		display: 'flex',
		zIndex: '1',
		height: '70vh',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainText: {
		padding: '0 1em'
	},
	subText: {
		padding: '0 1em',
		maxWidth: '50em',
		marginBottom: '0.5em'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	}
})

class Home extends Component {
	constructor() {
		super()
		this.state = {
			backgroundImg: '',
			info: {},
			tagline: ''
		}
	}
	componentDidMount() {
		let randIndex = Math.floor(Math.random() * 10) + 1 // Random number between 1 and 10

		tmdb.discoverMovie({ sort_by: 'vote_count.desc' }, (err, res) => {
			this.setState(
				{
					backgroundImg: `https://image.tmdb.org/t/p/w1280/${
						res.results[randIndex].backdrop_path
					}`,

					info: res.results[randIndex]
				},
				() => {
					tmdb.movieInfo({ id: this.state.info.id }, (err, res) => {
						this.setState({
							tagline: res.tagline // Yes. I sent an extra API request for the sole purpose of getting the tagline.
						})
					})
				}
			)
		})
	}
	render() {
		const { classes } = this.props

		return (
			<div
				className={classes.homePage}
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${
						this.state.backgroundImg
					})`
				}}
			>
				<Typography
					align="center"
					className={classes.mainText}
					variant="display3"
				>
					{this.state.info.title}
				</Typography>
				<Typography
					align="center"
					className={classes.subText}
					variant="display1"
				>
					{this.state.tagline}
				</Typography>
				<Link
					to={`/watch/movie/${this.state.info.id}`}
					style={{ textDecoration: 'none' }}
				>
					<Button variant="raised" color="primary">
						Watch
						<PlayArrow className={classes.rightIcon} />
					</Button>
				</Link>
			</div>
		)
	}
}

export default withStyles(styles)(Home)
