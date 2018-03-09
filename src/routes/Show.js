import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'

import Episodes from '../components/Episodes'
//import Hidden from 'material-ui/Hidden'
import { ListItem, ListItemText } from 'material-ui/List'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import classNames from 'classnames'

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'

const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const drawerWidth = 200
const styles = theme => ({
	root: {
		flexGrow: 1
	},
	appFrame: {
		height: 430,
		zIndex: 3,
		position: 'relative',
		display: 'flex',
		width: '100%'
	},
	appBar: {
		zIndex: 3,
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	'appBarShift-left': {
		marginLeft: drawerWidth
	},
	'appBarShift-right': {
		marginRight: drawerWidth
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	'content-left': {
		marginLeft: -drawerWidth
	},
	'content-right': {
		marginRight: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	'contentShift-left': {
		marginLeft: 0
	},
	'contentShift-right': {
		marginRight: 0
	}
})

class SeasonPicker extends Component {
	constructor() {
		super()
		this.handleSeasonChange = this.handleSeasonChange.bind(this)
		this.state = {
			open: false,
			listItems: [],
			showInfo: {},
			currentSeason: 1 // Default to start at season 1
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true })
	}

	handleDrawerClose = () => {
		this.setState({ open: false })
	}
	handleSeasonChange = (season, e) => {
		this.setState({
			currentSeason: season
		})
		this.handleDrawerClose()
	}

	componentDidMount() {
		tmdb.tvInfo({ id: this.props.match.params.id }, (err, res) => {
			let listItems = []
			for (let i = 1; i <= res.number_of_seasons; i++) {
				listItems.push(
					<ListItem
						key={i}
						onClick={e => this.handleSeasonChange(i, e)}
						button
					>
						<ListItemText primary={`Season ${i}`} />
					</ListItem>
				)
			}
			this.setState({
				listItems,
				showInfo: res
			})
		})
	}

	render() {
		const { classes, theme } = this.props
		const { open, showInfo, currentSeason } = this.state

		const drawer = (
			<Drawer
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={this.handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem>Seasons</ListItem>
				</List>
				<Divider />
				<List>{this.state.listItems}</List>
			</Drawer>
		)

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar
						className={classNames(classes.appBar, {
							[classes.appBarShift]: open,
							[classes[`appBarShift-left`]]: open
						})}
					>
						<Toolbar disableGutters={!open}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="title" color="inherit" noWrap>
								{showInfo.name}
							</Typography>
						</Toolbar>
					</AppBar>
					{drawer}
					<main
						className={classNames(classes.content, classes[`content-left`], {
							[classes.contentShift]: open,
							[classes[`contentShift-left`]]: open
						})}
					>
						<div className={classes.drawerHeader} />
						<Episodes season={currentSeason} id={this.props.match.params.id}/>
					</main>
				</div>
			</div>
		)
	}
}

SeasonPicker.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SeasonPicker)
