import React, { Component } from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles';
import Truncate from 'react-truncate';

const tmdb = require('moviedb')('2e0bfe56b018618b270a6e0428559292')


const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: 400,
    width: 300,
    margin: theme.spacing.unit * 2
  },
  media: {
    height: 200,
  },
});


class SearchResults extends Component {
	constructor() {
		super()
		this.state = {
			results: [],
			listItems: ''
		}
	}
	componentWillReceiveProps(nextProps) {
    const { classes } = this.props
    const { term } = nextProps
    console.log(term)
    if (term !== '') {
      tmdb.searchMulti({ query: term }, (err, res) => {
        this.setState({
          results: res.results,
          listItems: res.results.map(item => (
            <li key={item.id} style={{listStyleType: 'none', marginLeft: 'auto', marginRight: 'auto'}} >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={'https://image.tmdb.org/t/p/w500/' + item.poster_path}
                  title="Contemplative Reptile"
                />
              <CardContent style={{flex: 1}}>
                  <Typography variant="headline" component="h2">
                    {item.title || item.name}
                  </Typography>
                  <Typography component="p" style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <Truncate lines={5} ellipsis="...">
                        {item.overview}
                    </Truncate>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Watch
                  </Button>
                </CardActions>
              </Card>
            </li>
          ))
        })
      })
    }

	}
	render() {
		return (
			<div >
				<ul style={{marginLeft: 'auto', marginRight: 'auto', padding: 0}} className="searchResults">{this.state.listItems}</ul>
			</div>
		)
	}
}

export default withStyles(styles)(SearchResults)
