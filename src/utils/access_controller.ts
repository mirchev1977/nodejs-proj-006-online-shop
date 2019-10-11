export default function ( req, res, next, opt: {
    isLogged: boolean,
    roles: {}
} ) {
    if ( opt.isLogged ) {
        if ( !req[ 'userLogged' ] ) {
            res.render( 'user/login', { usr: {}, path: req.originalUrl } ); 
        } else if ( !opt.roles[ req.userLogged.role ] ) {
            res.render( 'user/login', { 
                usr: {}
                , path: req.originalUrl
                , ERR: 'You have to log in as ADМIN'
            } ); 
        }
    }
}