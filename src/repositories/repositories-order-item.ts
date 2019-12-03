import Sequelize from 'sequelize';
const  sequelize = require( '../utils/database' );

const OrderItem = sequelize.define( 'order_item', {
    id:       { type: Sequelize.INTEGER, autoIncrement: true, 
                primaryKey: true, allowNull: false },
    quantity: Sequelize.INTEGER
} );

export default OrderItem;