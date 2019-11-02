import Product from '../models/models-product';

export function getAllProducts ( req, res, next ) {
    Product.getAll().then( arrProducts => {
        res.render( 'products/all', { 
            userLogged: req[ 'userLogged' ]
            , arrProducts: arrProducts 
        } );
    }).catch( errMess => {
        res.render( 'products/all', { 
            userLogged: req[ 'userLogged' ],
            ERR: errMess.message
        } ); 
    } );
}