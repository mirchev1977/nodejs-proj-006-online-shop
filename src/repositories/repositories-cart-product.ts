import Sequelize from 'sequelize';
const  sequelize = require( '../utils/database' );

const CartProduct = sequelize.define( 'cart_product', {
    id:       { type: Sequelize.INTEGER, autoIncrement: true, 
                primaryKey: true, allowNull: false },
    quantity: Sequelize.INTEGER
} );

export default CartProduct;