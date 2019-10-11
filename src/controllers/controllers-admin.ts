import accessController from '../utils/access_controller';

export function getAdminAddProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );
    res.render( 'admin/product-add', { usr: {}, userLogged: req[ 'userLogged' ] } );
}