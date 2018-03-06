import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	input: {
		margin: theme.spacing.unit
	}
})

class Navbar extends Component {
  handleChange(e) {
    this.props.onUpdate(e.target.value)
  }
	render() {
		const { classes } = this.props
		return (
			<AppBar
				position="static"
				color="default"
				style={{ justifyContent: 'center' }}
			>
				<Toolbar>
					<Typography variant="title" color="inherit" style={{ flex: 1 }}>
						Dionysus
					</Typography>
					<Input
            ref="myInput"
            onChange={this.handleChange.bind(this)}
						placeholder="Search Movies or TV Shows"
						className={classes.input}
					/>
				</Toolbar>
			</AppBar>
		)
	}
}

export default withStyles(styles)(Navbar)
