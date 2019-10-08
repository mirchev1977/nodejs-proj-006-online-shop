export default function ( req, res, next, opt: {
    isLogged: boolean,
    roles: {}
} ) {
    if ( opt.isLogged ) {
        if ( !req[ 'userLogged' ] ) {
            res.render( 'user/login', { usr: {}, path: req.path } ); 
        }
    }
}