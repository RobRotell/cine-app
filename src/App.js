import React, { Component } from 'react';
import './scss/app.scss';

// components
import Movielist from './components/Movielist';
import Nav from './components/Nav';
import BtnAdder from './components/BtnAdder';
import PopupDetail from './components/PopupDetail';
import PopupAdder from './components/PopupAdder';

// import helper functions
import wpIntegration from './helpers/wpIntegration';


class App extends Component {

	state = {
		adderActive: 	false,
		adderQuery: 	'',
		adderMatches: 	[],
		adderInputting: false,
		adderTimeout: 	null,
		adderSearching:	false,

		popupActive: 	false,
		activeMovieId: 	0,
		
		showWatched: 	true,
		moviesToWatch: 	[],
		moviesWatched: 	[]
	}


	componentDidMount = () => {
		const movies = wpIntegration.getMovies(),
			moviesToWatch = [],
			moviesWatched = [];

		movies.then( response => {
			response.forEach( movie => {
				if( movie.to_watch ) {
					moviesToWatch.push( movie );
				} else {
					moviesWatched.push( movie );
				}
			});

			this.setState({
				moviesToWatch: moviesToWatch,
				moviesWatched: moviesWatched
			});
		});
	}


	handleTabClick = e => {
		this.setState({
			showWatched: ( e.currentTarget.value === 'watched' )
		})
	}


	handleAdderClick = e => {
		this.setState({
			adderActive: 	true,
			userSearching: 	true
		});
	}


	handleMovieClick = async id => {
		this.setState({
			popupActive: 	true,
			activeMovieId: 	id
		});
	}


	handleClosePopupDetail = e => {
		this.setState({
			popupActive: 	false,
			activeMovieId: 	0	
		})
	}


	handleCloseAdder = e => {
		this.setState({
			adderActive: false
		})
	}

	
	handleAdderInput = e => {
		const self = this,
			value = e.currentTarget.value;

		clearTimeout( self.state.adderTimeout );
		if( value.length > 5 ) {
			self.state.adderTimeout = setTimeout( () => {

				// for loading animation
				this.setState({
					adderSearching: true
				})

				self.findAdderMatches( value );
			}, 500 );
		}
	}


	findAdderMatches = async value => {
		const matches = await wpIntegration.searchByTitle( value );

		this.setState({
			adderSearching: false,
			adderMatches: 	matches,
			adderQuery: 	value
		});
	}


	handleAddClick = async ( id, action ) => {
		const newMovie = await wpIntegration.addMovie( id, action );

		if( action === 'toWatch' ) {
			this.setState({
				popupActive: 	false,
				adderActive: 	false,				
				showWatched: 	false,
				adderMatches: 	[],
				moviesToWatch: 	[
					newMovie,
					...this.state.moviesToWatch
				]
			})
		} else {
			this.setState({
				popupActive: 	false,
				adderActive: 	false,				
				showWatched: 	true,
				adderMatches: 	[],				
				moviesWatched: 	[
					newMovie,
					...this.state.moviesWatched
				]
			});
		}
	}


	render() {
		return (
			<main className="app">
				<Nav
					showWatched={ this.state.showWatched } 
					handleTabClick={ this.handleTabClick }
				/>
				<Movielist 
					display={ this.state.showWatched }
					movies={ this.state.moviesWatched } 
					handleMovieClick={ this.handleMovieClick }
				/>
				<Movielist 
					display={ !this.state.showWatched }
					movies={ this.state.moviesToWatch }
					// handleMovieClick={ this.handleToWatchMovieClick } 
				/>
				<BtnAdder 
					handleAdderClick={ this.handleAdderClick }
				/>
				<PopupDetail
					isActive={ this.state.popupActive }
					activeMovieId={ this.state.activeMovieId }
					closePopup={ this.handleClosePopupDetail }
				/>
				<PopupAdder
					isActive={ this.state.adderActive }
					adderSearching={ this.state.adderSearching }
					closeAdder={ this.handleCloseAdder }
					inputChange={ this.handleAdderInput }
					currentInput={ this.state.adderQuery }
					matches={ this.state.adderMatches }
					handleAddClick={ this.handleAddClick }
				/>
			</main>
		);
	}

}



export default App;
