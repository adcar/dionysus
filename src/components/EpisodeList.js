import React, { Component } from 'react'
import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemText } from 'material-ui/List'
import Modal from 'material-ui/Modal'
import VideoPlayer from './VideoPlayer'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: '60vw',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5]
	}
})

class EpisodeList extends Component {
	constructor() {
		super()
		this.state = {
			tvInfo: {},
			currentEpisode: 1,
			mp4Source: '',
			mkvSource: '',
			open: false
		}
		this.state.tvInfo.episodes = []
	}
	componentDidMount() {
		this.seasonChange(this.props.id, this.props.match.params.season)
	}
	componentWillReceiveProps(nextProps) {
		this.seasonChange(nextProps.id, nextProps.match.params.season)
	}
	seasonChange(id, season) {
		tmdb.tvSeasonInfo({ id: id, season_number: season }, (err, res) => {
			this.setState({
				tvInfo: res
			})
		})
	}
	handleOpen = (index, e) => {
		let seasonNumber = ''
		let episodeNumber = ''
		if (this.props.match.params.season < 10) {
			seasonNumber = `0${this.props.match.params.season}`
		} else {
			seasonNumber = `${this.props.match.params.season}`
		}
		if (index + 1 < 10) {
			episodeNumber = `0${index + 1}`
		} else {
			episodeNumber = `${index + 1}`
		}
		console.log(this.props.showName)
		this.setState({ open: true })
		this.setState({
			currentEpisode: index + 1,
			mp4Source: `https://ctvod.run/ctv/guestmod/${this.props.showName
				.replace(/[^\w\s]/gi, '')
				.replace(/\s+/g, '.')
				.toLowerCase()}.s${seasonNumber}e${episodeNumber}.mp4`,
			mkvSource: `https://ctvod.run/ctv/guestmod/${this.props.showName
				.replace(/[^\w\s]/gi, '')
				.replace(/\s+/g, '.')
				.toLowerCase()}.s${seasonNumber}e${episodeNumber}.mkv`
		})
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	render() {
		return (
			<div>
				<span>Season: {this.props.match.params.season}</span>
				<List>
					{this.state.tvInfo.episodes.map((item, index) => (
						<ListItem
							className="truncate"
							button
							key={item.id}
							onClick={e => this.handleOpen(index, e)}
						>
							<ListItemText primary={`${index + 1}. ${item.name}`} />
						</ListItem>
					))}
				</List>
				<Modal
					className="modal"
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div className="videoPlayerWrapper">
						<VideoPlayer autoPlay controls ref="player">
							<source src={this.state.mp4Source} type="video/mp4" />
							<source src={this.state.mkvSource} />
						</VideoPlayer>
					</div>
				</Modal>
			</div>
		)
	}
}
export default withStyles(styles)(EpisodeList)
