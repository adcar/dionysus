import React from 'react'
import './App.css'
import teal from 'material-ui/colors/teal'
import amber from 'material-ui/colors/amber'
import Reboot from 'material-ui/Reboot'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Navbar from './components/Navbar'
import SearchResults from './routes/SearchResults'
import Movie from './routes/Movie'
import Show from './routes/Show'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: amber
	}
})

const App = props => (
	<Router>
		<MuiThemeProvider theme={theme}>
			<Reboot />
			<Navbar />
			<Route path="/search/:term" component={SearchResults} />
			<Route path="/movie/:id" component={Movie} />
			<Route path="/show/:id" component={Show} />
		</MuiThemeProvider>
	</Router>
)

export default App
