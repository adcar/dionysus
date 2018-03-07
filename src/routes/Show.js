import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { Route, Link } from 'react-router-dom'
import EpisodeList from '../components/EpisodeList'
import { ListItem, ListItemText } from 'material-ui/List'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const drawerWidth = 240

const styles = theme => ({
	root: {
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	content: {

		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0 // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar
})

class EpisodePicker extends Component {
	constructor() {
		super()
		this.state = {
			showInfo: {},
			listItems: []
		}
	}
	componentDidMount() {
		tmdb.tvInfo({ id: this.props.match.params.id }, (err, res) => {
			let listItems = []
			for (let i = 1; i <= res.number_of_seasons; i++) {
				listItems.push(
					<Link
						to={`${this.props.match.url}/${i}`}
						style={{ textDecoration: 'none' }}
            key={i}
					>
						<ListItem button color="inherit">
							<ListItemText primary={`Season ${i}`} />
						</ListItem>
					</Link>
				)
			}
			this.setState({
				listItems,
				showInfo: res
			})
		})
	}
	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				<AppBar position="absolute" className={classes.appBar}>
					<Toolbar>
						<Typography variant="title" color="inherit" noWrap>
							{this.state.showInfo.name}
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.toolbar} />
					<List>{this.state.listItems}</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Route
						path={`${this.props.match.url}/:season`}
						render={props => (
							<EpisodeList {...props} id={this.props.match.params.id} />
						)}
					/>
				</main>
			</div>
		)
	}
}

export default withStyles(styles)(EpisodePicker)
