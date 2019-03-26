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
			source: `https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`
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
