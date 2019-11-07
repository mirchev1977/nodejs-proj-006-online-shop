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

export function getMyProducts ( req, res, next ) {
    Product.getMine( req.userLogged.id ).then( arrProducts => {
        res.render( 'products/mine', { 
            userLogged: req[ 'userLogged' ]
            , arrProducts: arrProducts 
            , ERR:    req.query.err  || ''
            , CONT:   req.query.cont || ''
            , prodId: req.query.prodId || ''
        } );
    }).catch( errMess => {
        res.render( 'products/mine', { 
            userLogged: req[ 'userLogged' ],
            ERR: errMess.message
        } ); 
    } );
}