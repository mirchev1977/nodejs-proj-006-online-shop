import Product from '../models/models-product';
import accessController from '../utils/access_controller';

export function getAdminAddProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );
    res.render( 'admin/product-add', { usr: {}, userLogged: req[ 'userLogged' ] } );
}

export function postAdminAddProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );

    const product = new Product(
        req.body.title,
        req.body.price,
        req.body.prodDate,
        req.body.description,
        req.body.image
    );

    product.create( req.userLogged.repo ).then( product => {
        res.render( 'admin/product-add', { usr: {}, userLogged: req[ 'userLogged' ] } );
    } ).catch( err => {
        res.render( 'admin/product-add', { usr: {}, userLogged: req[ 'userLogged' ] } );
    } );

}