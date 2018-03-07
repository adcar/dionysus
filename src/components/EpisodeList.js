import React, { Component } from 'react'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

class EpisodeList extends Component {
  constructor() {
    super()
    this.state = {
      tvInfo: {},
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
	render() {
		return (
      <div>
        <span>Season: {this.props.match.params.season} </span>
        <span>Episodes: {this.state.tvInfo.episodes.length}</span>
      </div>
    )
	}
}
export default EpisodeList
