import React, { Component } from 'react'
import VideoPlayer from '../components/VideoPlayer'

const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

class Movie extends Component {
	constructor() {
		super()
		this.state = {
			title: ''
		}
	}
	componentDidMount() {
		tmdb.movieInfo({ id: this.props.match.params.id }, (err, res) => {
			this.setState({
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
	render() {
		if (this.state.mp4Source && this.state.mkvSource) {
			return (
				<div>
					<VideoPlayer>
						<source src={this.state.mp4Source} type="video/mp4" />
						<source src={this.state.mkvSource} />
						Either this movie is not available or you need to uprgade your
						browser to the latest version of Chrome
					</VideoPlayer>
				</div>
			)
		} else {
			return <div />
		}
	}
}

export default Movie
