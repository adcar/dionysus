import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input'
import { withRouter, Link } from 'react-router-dom'

class Navbar extends Component {
	handleChange(e) {
		console.log(e.target.value)
		this.props.history.push('/search/' + e.target.value)
	}
	render() {
		return (
			<AppBar
				position="static"
				color="default"
				style={{ justifyContent: 'center' }}
			>
				<Toolbar>
					<Link to="/" style={{ flex: 1, textDecoration: 'none'}}>
						<Typography variant="title" >
							Dionysus
						</Typography>
					</Link>
					<Input
						ref="myInput"
						onChange={this.handleChange.bind(this)}
						placeholder="Search Movies or TV Shows"
					/>
				</Toolbar>
			</AppBar>
		)
	}
}

export default withRouter(Navbar)
