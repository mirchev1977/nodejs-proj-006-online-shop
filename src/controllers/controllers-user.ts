export function getUsrRegister ( req, res, next ) {
    res.render( 'user/register' );
}

export function postUsrRegister ( req, res, next ) {
    res.render( 'user/registered' );
}