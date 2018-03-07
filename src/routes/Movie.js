import React, { Component } from 'react'
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react'

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
					'http://ctvod.run/ctv/guestmod/' +
					res.title
						.replace(/[^\w\s]/gi, '')
						.replace(/\s+/g, '.')
						.toLowerCase() +
					'.mp4',
				mkvSource:
					'http://ctvod.run/ctv/guestmod/' +
					res.title
						.replace(/[^\w\s]/gi, '')
						.replace(/\s+/g, '.')
						.toLowerCase() +
					'.mkv'
			})
      this.refs.player.load();
		})
	}
	render() {
		return (
			<div>
        <Player autoPlay controls ref="player">
          <source src={this.state.mp4Source} type="video/mp4" />
          <source src={this.state.mkvSource} type="video/mkv" />
        </Player>
			</div>
		)
	}
}

export default Movie
