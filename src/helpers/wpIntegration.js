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


	makeRequest( method, slug, params ) {
		let endpoint = '',
			body = null;

		if( method !== 'GET' && method !== 'PUT' && method !== 'DELETE' && method !== 'POST' )
			return false;

		if( method === 'GET' ) {
			endpoint = `${this.apiUrl}/${slug}?${params.toString()}`;
		
		} else {
			endpoint = `${this.apiUrl}/${slug}`;

			body = {
				method:		method,
				headers: 	{ 'Content-Type': 'application/x-www-form-urlencoded' },
				body: 		params
			}
		}

		return fetch( endpoint, body )
			.then( async response => {
				const result = {
					success: 	null,
					data: 		null,
					error: 		null
				};

				if( response.status === 400 ) {
					result.success = false;

					await response.json().then( error => {
						if( error.hasOwnProperty( 'message' ) && error.message.length )
							result.error = error.message;
					});

				} else {
					result.success = true;
					result.data = await response.json();
				}

				return result;
			});
	},


	getMovies() {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );

		return this.makeRequest( 'GET', 'get-movies', params );
	},


	getMovie( id ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );

		return this.makeRequest( 'GET', 'get-movie-by-id', params );
	},


	searchByTitle( value ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'title', value );
		params.append( 'limit', 10 );

		return this.makeRequest( 'GET', 'search-by-title', params );
	},


	addMovie( id, action ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );
		params.append( 'to_watch', ( action === 'toWatch' ) );

		return this.makeRequest( 'POST', 'add-movie-by-id', params );
	},


	setMovieAsWatched( id, status ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );
		params.append( 'status', status );

		return this.makeRequest( 'PUT', 'set-movie-as-watched', params );
	},


	deleteMovie( id ) {
		const params = new URLSearchParams();
		params.append( 'auth', this.getAuth() );
		params.append( 'id', id );

		return this.makeRequest( 'DELETE', 'delete-movie', params );
	}



}


export default wpIntegration;