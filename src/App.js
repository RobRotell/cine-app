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
		adderSearching: false,
		addResults: 	[],

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
			if( response.success !== true ) {
				this.showFetchError( response );
			} else {
				response.data.forEach( movie => {
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


	showFetchError = message => {
		let error;

		if( typeof( message ) === 'string' ) {
			error = message;
		} else if( typeof( message ) === 'object' && message.hasOwnProperty( 'error' ) ) {
			error = message.error;
		} else {
			error = 'Unknown error occurred';
		}
	
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
					if( response.success !== true ) {
						console.log( response );
						this.showFetchError( response );
					} else {
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
				.then( response => {
					if( response.success !== true ) {
						this.showFetchError( response );
					} else {
						this.setState({
							showWatched: 	true,
							moviesWatched: 	[
								response.data,
								...this.state.moviesWatched
							],
							moviesToWatch: 	this.state.moviesToWatch.filter( item => {
								return item.id !== id;
							})
						});

						this.scrollToTop();
					}
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
			.then( response => {
				if( response.success !== true ) {
					this.showFetchError( response );
				} else {
					if( action === 'toWatch' ) {
						this.setState({
							detailActive: 	false,
							adderActive: 	false,
							adderSearching: false,
							addResults: 	[],							
							showWatched: 	false,
							moviesToWatch: 	[
								response.data,
								...this.state.moviesToWatch
							]
						})
					} else {
						this.setState({
							detailActive: 	false,
							adderActive: 	false,
							adderSearching: false,
							addResults: 	[],							
							showWatched: 	true,
							moviesWatched: 	[
								response.data,
								...this.state.moviesWatched
							]
						});
					}

					this.scrollToTop();
				}
			});
	}


	handleAddInput = value => {
		this.setState({
			adderSearching: true
		});

		wpIntegration
			.searchByTitle( value )
			.then( response => {
				if( response.success !== true ) {
					this.showFetchError( response );
				} else {				
					this.setState({
						adderSearching: false,
						addResults: response.data
					})
				}
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
					isSearching={ this.state.adderSearching }
					closeAdder={ this.handleClosePopupAdder }
					handleAddClick={ this.handleAddClick }
					handleAddInput={ this.handleAddInput }
					addResults={ this.state.addResults }
				/>
			</main>
		);
	}

}



export default App;
