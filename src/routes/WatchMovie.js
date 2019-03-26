import React, { Component } from 'react'

class WatchMovie extends Component {
	constructor() {
		super()
		this.state = {
			source: ''
		}
	}
	componentDidMount() {
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
						title="Watch Movie"
						allowFullScreen
					/>
				</div>
			)
		} else {
			return <div />
		}
	}
}

export default WatchMovie
