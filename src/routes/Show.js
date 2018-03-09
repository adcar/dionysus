import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { Route, Link } from 'react-router-dom'
import EpisodeList from '../components/EpisodeList'
import Hidden from 'material-ui/Hidden'
import { ListItem, ListItemText } from 'material-ui/List'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')

const drawerWidth = 200

const styles = theme => ({
	root: {
		zIndex: 1,
		flex: 1,
		height: 'calc(100vh - 70px)',
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},

	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},

	drawerPaper: {
		position: 'relative',
		width: drawerWidth,
		maxWidth: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	content: {
		maxHeight: 'calc(100vh - 70px)',
		overflowY: 'scroll',
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0 // So the Typography noWrap works
	},

	toolbar: theme.mixins.toolbar,
	topbar: {
		height: 50
	}
})



class EpisodePicker extends Component {
	constructor() {
		super()
		this.state = {
			showInfo: {},
			listItems: [],
			mobileOpen: false
		}
	}
	handleDrawerToggle = () => {
		this.setState({ mobileOpen: !this.state.mobileOpen })
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
						onClick={this.handleDrawerToggle}
					>
						<ListItem button>
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
		const { classes, theme } = this.props
		const drawer = (<List>
			<ListItem>Seasons</ListItem>
			<Divider />
			{this.state.listItems}
		</List>)

		return (
			<div className={classes.root}>
				<AppBar position="absolute" className={classes.appBar}>
					<Toolbar className={classes.topbar}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="title" color="inherit" noWrap>
							{this.state.showInfo.name}
						</Typography>
					</Toolbar>
				</AppBar>

				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={this.state.mobileOpen}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>

				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Route
						path={`${this.props.match.url}/:season`}
						render={props => (
							<EpisodeList
								{...props}
								id={this.props.match.params.id}
								showName={this.state.showInfo.name}
							/>
						)}
					/>
				</main>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(EpisodePicker)
