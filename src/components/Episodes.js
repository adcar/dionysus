import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Truncate from 'react-truncate'

const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const styles = theme => ({
	card: {
		margin: theme.spacing.unit,
		maxWidth: 345,
		display: 'flex',
		flexDirection: 'column'
	},
	media: {
		height: 200,
    width: 345
	},
	cardsContainer: {
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	seasonTitle: {
		marginBottom: theme.spacing.unit * 3
	}
})

class Episode extends Component {
	constructor() {
		super()
		this.state = {
			episodes: []
		}
	}
	componentWillReceiveProps(nextProps) {
		const { classes } = this.props
		tmdb.tvSeasonInfo(
			{ id: nextProps.id, season_number: nextProps.season },
			(err, res) => {
				this.setState({
					episodes: res.episodes.map(episode => (
						<Card className={classes.card} key={episode.id}>
							<CardMedia
								className={classes.media}
								image={`https://image.tmdb.org/t/p/w300/${episode.still_path}`}
								title={`Cover Image for ${episode.name}`}
							/>
							<CardContent style={{ flex: 1 }}>
								<Typography variant="headline" component="h2">
									{episode.name}
								</Typography>
								<Typography component="p">
									<Truncate lines={4} ellipsis="...">
										{episode.overview}
									</Truncate>
								</Typography>
							</CardContent>
							<CardActions>
                <Link to={`/watch/show/${nextProps.id}/${episode.season_number}/${episode.episode_number}`} style={{textDecoration: 'none'}}>
                  <Button size="small" color="primary">
                    Watch
                  </Button>
                </Link>
							</CardActions>
						</Card>
					))
				})
			}
		)
	}
	render() {
		const { season, classes } = this.props
		return (
			<div>
				<Typography
					variant="display1"
					align="center"
					className={classes.seasonTitle}
				>
					<strong>{`Season ${season}`}</strong>
				</Typography>
				<div className={classes.cardsContainer}>{this.state.episodes}</div>
			</div>
		)
	}
}

Episode.propTypes = {
	season: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired
}

export default withStyles(styles)(Episode)
