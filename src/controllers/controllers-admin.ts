import Product from '../models/models-product';
import accessController from '../utils/access_controller';

export function getAdminAddProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );
    res.render( 'admin/product-add', {
        usr: {}, 
        userLogged: req[ 'userLogged' ],
        prod: req.product || {},
        ERR:  req.err || ""
    });
}

export function postAdminAddProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );

    let product: Product;
    try {
        product = new Product(
            req.body.title,
            req.body.price,
            req.body.prodDate,
            req.body.description,
            req.body.image
        );
    } catch ( err ) {
        req.product = req.body;
        req.err     = err;
        getAdminAddProduct( req, res, next );
    }

    product.create( req.userLogged.repo ).then( product => {
        res.redirect( '/products/all' ); 
    } ).catch( err => {
        console.log( 'Error: ', err );
        req.product = product;
        req.err     = 'There are some problems. Product cannot be created...';
        getAdminAddProduct( req, res, next );
    } );

}

export function getAdminEditProduct ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { user: 1, admin: 1 } } );

    Product.getOneByPk( 
        ( req.params.id * 1 ) 
    ).then( _product => {
        res.render( 'admin/product-edit', {
            usr: {}, 
            userLogged: req[ 'userLogged' ],
            prod: _product || {},
            ERR:  req.err || ""
        });
    } ).catch( _err => {
        res.redirect( '/products/mine' + `?cont=1&err=${_err}` );
    } );
}

export function postAdminEditProduct( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { user: 1, admin: 1 } } );

    try { 
        new Product( 
                req.body.title,
                req.body.price,
                req.body.prodDate,
                req.body.description,
                req.body.image,
                req.body.id * 1
            ) 
            Product.edit( new Product( 
                req.body.title,
                req.body.price,
                req.body.prodDate,
                req.body.description,
                req.body.image,
                req.body.id * 1
            ) ).then( prod => {
                res.redirect( '/products/mine?prodId=container-product-' + prod.id );
            } ).catch( err => {
                res.render( 'admin/product-edit', {
                    usr: {}, 
                    userLogged: req[ 'userLogged' ],
                    prod: req.body || {},
                    ERR:  err || ""
                });
            } ); 
    } catch ( err ) {
        res.render( 'admin/product-edit', {
            usr: {}, 
            userLogged: req[ 'userLogged' ],
            prod: req.body || {},
            ERR:  err.message || ""
        });
    }
}