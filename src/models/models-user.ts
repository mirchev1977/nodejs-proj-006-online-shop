import UserRepo  from "../repositories/repositories-user";
import LoginRepo  from "../repositories/repositories-login";
import Login     from "./models-login";
import { promises } from "dns";

export default class User {
    private _names:     string;
    private _email:     string;
    private _password:  string;
    public  loginToken: string;
    private _role:      string;

    constructor ( names, email, password, passwordRepeat ) {

        if ( password !== passwordRepeat ) {
            throw new Error( "Password and Password Repeat do not match." );
        }

        this.names    = names;
        this.email    = email;
        this.password = password; 
        this.role     = 'user';

        return this;
    }

    create(): Promise<User> {
        const promise: Promise<User> = new Promise( ( resolve, reject ) => {
            UserRepo.create( {
                names:    this.names,
                email:    this.email,
                password: this.password,
                role:     this.role,
            } ).then( usr => {
                const login: Login = new Login( usr );
                return login.createLogin();
            } ).then( loginToken => {
                this.loginToken = loginToken;
                resolve( this );
            } ).catch( err => {
                console.log( 'User cannot be created...', err );
                reject( 'User cannot be created...' );
            } );
        } );

        return promise;
    }

    static findByEmailPassword ( email: string, password: string ): Promise<User> {
        const promise: Promise<User> = new Promise( ( resolve, reject ) => {
            let userCreated: User;
            UserRepo.findAll( {
                where: {
                    email: email,
                    password: password
                }
            } ).then( users => {
                userCreated = new User( 
                        users[0].names,    users[0].email, 
                        users[0].password, users[0].password
                    );
                userCreated.role = users[0].role;
                const login: Login = new Login( users[0] );
                return login.createLogin();
            } ).then( loginToken => {
                userCreated.loginToken = loginToken;
                resolve( userCreated );
            } ).catch( err => {
                reject( err );
            } );
        } );

        return promise;
    }

    static findByToken ( token: string ): Promise<User> {
        const promise: Promise<User> = new Promise( ( resolve, reject ) => {
            UserRepo.findAll( {
                include: [ {
                    model: LoginRepo,
                    where: { token: token }
                } ]
            } ).then( usrsArr => {
                const usr = usrsArr[0];
                const user = new User( usr.names
                    , usr.email
                    , usr.password
                    , usr.password );
                user.role = usr.role;
                resolve( user );
            } ).catch( err => {
                reject( 'There is no such user...' );
            } );
        } );

        return promise;
    }

    set names ( names: string ) {
        if ( names.length < 2 ) {
            throw new Error( "Name should be longer and equal to 2 characters." );
        }

        this._names = names;
    }

    get names (): string {
        return this._names;
    }

    set email ( email: string ) {
        if ( !email.match( /[a-zA-Z0-9\.\-]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,5}/ ) ) {
            throw new Error( "Please, enter a valid email address!" );
        }

        this._email = email;
    }

    get email (): string {
        return this._email;
    } 

    set role ( role: string ) {
        this._role = role;
    }

    get role (): string {
        return this._role;
    }

    set password ( password: string ) {
        if ( password.length < 5 ) {
            throw new Error( "Please, make the length of your password at least 5 symbols long!" );
        }

        if ( !password.match( /[A-Z]/ ) ) {
            throw new Error( "Your password has to contain at least one capital letter." );
        }

        if ( !password.match( /[0-9]/ ) ) {
            throw new Error( "Your password has to contain at least one digit." );
        }

        if ( !password.match( /[a-z]/ ) ) {
            throw new Error( "Your password has to contain at least one lower-case letter." );
        }

        this._password = password;
    }

    get password (): string {
        return this._password;
    } 
}