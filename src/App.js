import React, { Component } from 'react';
import './scss/app.scss';

// components
import Movielist from './components/Movielist';
import Nav from './components/Nav';
import PopupDetail from './components/PopupDetail';
import PopupAdder from './components/PopupAdder';

// import helper functions
import wpIntegration from './helpers/wpIntegration';


class App extends Component {

	state = {
		adderActive: 	false,

		detailActive: 	false,
		activeMovieId: 	0,
		
		isLoadingMovies: 	false,
		showWatched: 		false,
		moviesToWatch: 		[],
		moviesWatched: 		[]
	}


	componentDidMount = () => {
		const movies = wpIntegration.getMovies(),
			moviesToWatch = [],
			moviesWatched = [];

		// show loading animation
		this.setState({
			isLoadingMovies: true
		});

		movies.then( response => {

			// movies should be in an array. If object, likely invalid auth
			if( !Array.isArray( response ) ) {
				this.maybeShowFetchError( response );

			// otherwise, categorize movies
			} else {
				response.forEach( movie => {
					if( movie.to_watch ) {
						moviesToWatch.push( movie );
					} else {
						moviesWatched.push( movie );
					}
				});

				this.setState({
					moviesToWatch: 		moviesToWatch,
					moviesWatched: 		moviesWatched
				});				
			}

			this.setState({
				isLoadingMovies: false
			});
		});
	}


	maybeShowFetchError = arg => {
		let error = `Sorry, we couldn't fetch movies.`;
	
		if( arg.hasOwnProperty( 'message' ) )
			error = arg.message;
	
		alert( error );	
	}


	handleTabClick = e => {
		this.setState({
			adderActive: 	false,
			detailActive: 	false,
			activeMovieId: 	0,
			showWatched: 	( e.currentTarget.value === 'watched' )
		});

		this.scrollToTop();
	}


	handleMovieAdd = e => {
		this.setState({
			detailActive: 	false,
			activeMovieId: 	0,
			adderActive: 	true,
		});
	}


	handleWatchedMovieClick = id => {
		this.setState({
			adderActive: 	false,
			detailActive: 	true,
			activeMovieId: 	id
		});
	}


	handleToWatchMovieClick = ( id, action ) => {
		if( action === 'delete' ) {
			wpIntegration
				.deleteMovie( id )
				.then( response => {
					if( response ) {
						this.setState({
							moviesToWatch: 	this.state.moviesToWatch.filter( item => {
								return item.id !== id;
							})
						});
					}
				});			

		} else if( action === 'watched' ) {
			wpIntegration
				.setMovieAsWatched( id, true )
				.then( updatedMovie => {
					this.setState({
						showWatched: 	true,
						moviesWatched: 	[
							updatedMovie,
							...this.state.moviesWatched
						],
						moviesToWatch: 	this.state.moviesToWatch.filter( item => {
							return item.id !== id;
						})
					});

					this.scrollToTop();
				});
		}
	}	


	scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}


	handleClosePopupDetail = e => {
		this.setState({
			detailActive: 	false,
			activeMovieId: 	0	
		})
	}


	handleClosePopupAdder = e => {
		this.setState({
			adderActive: false
		})
	}


	handleAddClick = ( id, action ) => {
		wpIntegration
			.addMovie( id, action )
			.then( newMovie => {
				if( action === 'toWatch' ) {
					this.setState({
						// detailActive: 	false,
						// adderActive: 	false,
						// showWatched: 	false,
						moviesToWatch: 	[
							newMovie,
							...this.state.moviesToWatch
						]
					})
				} else {
					this.setState({
						// detailActive: 	false,
						// adderActive: 	false,
						// showWatched: 	true,
						moviesWatched: 	[
							newMovie,
							...this.state.moviesWatched
						]
					});
				}

				// this.scrollToTop();
			});
	}


	render() {
		const classes = [ 'app' ];

		if( this.state.isLoadingMovies )
			classes.push( 'is-loading' );

		return (
			<main className={ classes.join( ' ' ) }>
				<Nav
					showWatched={ this.state.showWatched } 
					handleTabClick={ this.handleTabClick }
					handleMovieAdd={ this.handleMovieAdd }
				/>
				<Movielist 
					display={ this.state.showWatched }
					movies={ this.state.moviesWatched } 
					handleMovieClick={ this.handleWatchedMovieClick }
				/>
				<Movielist 
					display={ !this.state.showWatched }
					movies={ this.state.moviesToWatch }
					handleMovieClick={ this.handleToWatchMovieClick } 
				/>
				<PopupDetail
					isActive={ this.state.detailActive }
					activeMovieId={ this.state.activeMovieId }
					closePopup={ this.handleClosePopupDetail }
				/>
				<PopupAdder
					isActive={ this.state.adderActive }
					closeAdder={ this.handleClosePopupAdder }
					handleAddClick={ this.handleAddClick }
				/>
			</main>
		);
	}

}



export default App;
