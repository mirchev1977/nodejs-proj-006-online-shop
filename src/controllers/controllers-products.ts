import Product from '../models/models-product';
import accessController from '../utils/access_controller';

export function getAllProducts ( req, res, next ) {
    res.render( 'products/all', { usr: {}, userLogged: req[ 'userLogged' ] } );
}