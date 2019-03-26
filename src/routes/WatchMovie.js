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
			source: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
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
