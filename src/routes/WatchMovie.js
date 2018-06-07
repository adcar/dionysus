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
			source: `https://videospider.in/getvideo?key=KTuojUiVZuz69WKn&video_id=${
				this.props.match.params.id
			}&tmdb=1`
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
