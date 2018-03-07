import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input'
import { withRouter, Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'

class Navbar extends Component {
	constructor() {
		super()
		this.state = {
			searchTerm: ''
		}
	}
	updateHistory() {
		this.props.history.push('/search/' + this.state.searchTerm)
	}
	handleChange(e) {
		// Only do live updates on desktop browser, where on mobile (or anything else) you have to hit your (virtual) enter key
		if (isBrowser) {
			this.setState({ searchTerm: e.target.value }, this.updateHistory)
		} else {
			this.setState({ searchTerm: e.target.value })
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		this.updateHistory()
	}
	render() {
		return (
			<AppBar
				position="static"
				color="default"
				style={{ justifyContent: 'center' }}
			>
				<Toolbar>
					<Link to="/" style={{ flex: 1, textDecoration: 'none' }}>
						<Typography variant="title">Dionysus</Typography>
					</Link>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<Input
							ref="myInput"
							onChange={this.handleChange.bind(this)}
							placeholder="Search Movies or TV Shows"
						/>
					</form>
				</Toolbar>
			</AppBar>
		)
	}
}

export default withRouter(Navbar)
