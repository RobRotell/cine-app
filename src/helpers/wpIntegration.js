const wpIntegration = {

	apiUrl: 'https://api.cine.robr.app/wp-json/cine/v1',
	auth: 	null,


	getAuth() {
		if( this.auth === null ) {
			const params = new URLSearchParams( window.location.search );
			this.auth = params.get( 'auth' );
		}

		return this.auth;
	},


	getMovies() {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );

		let endpoint = `${this.apiUrl}/get-movies?${ params.toString() }`;

		return fetch( endpoint )
			.then( response => response.json() );
	},


	getMovie( id ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );

		let endpoint = `${this.apiUrl}/get-movie-by-id?${ params.toString() }`;

		return fetch( endpoint )
			.then( response => response.json() );
	},


	searchByTitle( value ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'title', value );
		params.append( 'limit', 10 );

		let endpoint = `${this.apiUrl}/search-by-title?${ params.toString() }`;

		return fetch( endpoint )
			.then( response => response.json() );
	},


	addMovie( id, action ) {
		const formData = new FormData();
		formData.append( 'auth', this.getAuth() );
		formData.append( 'id', id );
		formData.append( 'to_watch', ( action === 'toWatch' ) );

		let endpoint = `${this.apiUrl}/add-movie-by-id`;

		return fetch(
			endpoint,
			{
				method: 'POST',
				body: 	formData
			}
		).then( response => response.json() );
	},


	setMovieAsWatched( id, status ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );
		params.append( 'status', status );

		return fetch(
			`${this.apiUrl}/set-movie-as-watched`,
			{
				method:		'PUT',
				headers: 	{ 'Content-Type': 'application/x-www-form-urlencoded' },
				body: 		params
			}
		).then( response => response.json() );
	},


	deleteMovie( id ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );

		return fetch(
			`${this.apiUrl}/delete-movie`,
			{
				method:		'DELETE',
				headers: 	{ 'Content-Type': 'application/x-www-form-urlencoded' },
				body: 		params
			}
		).then( response => response.json() );
	}



}


export default wpIntegration;