import Product from '../models/models-product';

export function getAllProducts ( req, res, next ) {
    Product.getAll( req.query ).then( arrProducts => {
        res.render( 'products/all', { 
            userLogged: req[ 'userLogged' ]
            , arrProducts: arrProducts 
            , sort: req.query.sort
        } );
    }).catch( errMess => {
        res.render( 'products/all', { 
            userLogged: req[ 'userLogged' ],
            ERR: errMess.message,
            sort: req.query.sort
        } ); 
    } );
}

export function getMyProducts ( req, res, next ) {
    Product.getMine( req.userLogged.id, req.query ).then( arrProducts => {
        res.render( 'products/mine', { 
            userLogged: req[ 'userLogged' ]
            , arrProducts: arrProducts 
            , ERR:    req.query.err  || ''
            , CONT:   req.query.cont || ''
            , prodId: req.query.prodId || ''
            , sort: req.query.sort
        } );
    }).catch( errMess => {
        res.render( 'products/mine', { 
            userLogged: req[ 'userLogged' ],
            ERR: errMess.message,
            sort: req.query.sort
        } ); 
    } );
}