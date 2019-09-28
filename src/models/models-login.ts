export default class Login {
    private user;
    constructor ( user ) {
        this.user = user;
    }

    private _createUserLogin () {
        return this.user.createLogin( {
            token: `${this.user[ 'password' ]}${this.user[ 'email' ]}` 
        } );
    }

    createLogin (): Promise<string> {
        const promise: Promise<string> = new Promise<string>( ( resolve, reject ) => {
            this._createUserLogin().then( login => {
                console.log( `LoginToken: ${login[ 'token' ]}` );

                resolve( login[ 'token' ] );
            } ).catch( err => {
                reject( `Cannot create Login: ${err}` );
            } );
        } );

        return promise;
    }
}