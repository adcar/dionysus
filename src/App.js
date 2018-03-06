import React, { Component } from 'react'
import './App.css'
import teal from 'material-ui/colors/teal'
import Reboot from 'material-ui/Reboot'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import { BrowserRouter as Router } from 'react-router-dom'

const theme = createMuiTheme({
	palette: {
		primary: teal
	}
})

class App extends Component {
	constructor() {
		super()
		this.state = {
			searchTerm: ''
		}
	}
	onUpdate(data) {
		this.setState({
			searchTerm: data
		})
	}
	render() {
		const { searchTerm } = this.state
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<Reboot />
					<Navbar onUpdate={this.onUpdate.bind(this)} />
					<SearchResults term={searchTerm} />
				</MuiThemeProvider>
			</Router>
		)
	}
}

export default App
