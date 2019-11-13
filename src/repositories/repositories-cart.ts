import Sequelize from 'sequelize';
const  sequelize = require( '../utils/database' );

const Cart = sequelize.define( 'cart', {
    id: { 
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true, 
            allowNull: false 
        },
} );

export default Cart;