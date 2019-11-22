import Product          from '../models/models-product';
import ProductRepo      from '../repositories/repositories-product';
import accessController from '../utils/access_controller';
import { unixToDateHR } from '../utils/date';

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
    accessController( req, res, next, { isLogged: true
        , roles: { admin: 1 } } );

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

export function getAddProductToCart ( req, res, next ) {
    const itemId = req.params.id * 1;

    let mainBasket = null;
    let quantity = 0; 
    req.userLogged.repo.getCart().then( basket => {
        mainBasket = basket;
        return basket.getItem( { where: { id: itemId } } ).then( items => {
            const item = items[ 0 ];
            if ( item ) {
                quantity = item.cart_product.quantity || 0;
            }

            quantity++;

            return ProductRepo.findByPk( itemId );
        } )
    } )
    .then( prod => {
        return mainBasket.addItem( prod, { through: { quantity: quantity } } );
    } )
    .then( arrItemAdded  => {
        res.redirect( '/products/cart' );
    } )
    .catch( err => {
        debugger;
        next();
    } );
}


export function getCartProducts ( req, res, next ) {
    accessController( req, res, next, { isLogged: true
        , roles: { user: 1, admin: 1 } } );

    req.userLogged.repo.getCart().then( basket => {
        return basket.getItem();
    }).then( arrItems => {
        const _arrItems = arrItems.map( itm => {
            return new Product(  
                itm.title, 
                itm.price, 
                unixToDateHR( Number( itm.prodDate ) ),
                itm.description, 
                itm.image, 
                itm.id 
            ); 
        } );

        Product.sort( _arrItems, req.query.sort ); 

        res.render( 'products/added-cart', { 
            userLogged: req[ 'userLogged' ]
            , arrProducts: _arrItems 
            , ERR:    req.query.err  || ''
            , CONT:   req.query.cont || ''
            , prodId: req.query.prodId || ''
            , sort: req.query.sort
        } );
    } )
    .catch( err => {
        debugger;
        next();
    } );
}