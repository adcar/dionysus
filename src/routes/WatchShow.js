import React, { Component } from 'react'

class WatchShow extends Component {
	constructor() {
		super()
		this.state = {
			source: ''
		}
	}
	componentDidMount() {
		const { id, season_number, episode_number } = this.props.match.params

		this.setState({
			source: `https://videospider.in/getvideo?key=KTuojUiVZuz69WKn&video_id=${id}&s=${season_number}&e=${episode_number}&tmdb=1&tv=1`
		})
	}
	render() {
		if (this.state.source) {
			console.log(this.state.source)
			return (
				<div>
					<iframe
						src={this.state.source}
						id="watch"
						title="Watch Show"
						allowFullScreen
					/>
				</div>
			)
		} else {
			return <div />
		}
	}
}

export default WatchShow
