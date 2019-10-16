import User         from '../models/models-user';
import UserRepo  from "../repositories/repositories-user";

 const userLogin = ( req, res, next ) => {
    if ( 
        ( req[ 'session' ]
        && req[ 'session' ][ 'loginToken' ] )
    ) {
        User.findByToken( req[ 'session' ][ 'loginToken' ] ).then( user => {
            req[ 'userLogged' ] = user;
            next();
        } ).catch( str => {
            req[ 'session' ].destroy();
            next();
        } );
    } else {
        next();
    }

} 

const settings = {
    userLogin: userLogin
};

export default settings;