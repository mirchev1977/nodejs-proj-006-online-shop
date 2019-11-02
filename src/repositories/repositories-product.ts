import Sequelize, { INTEGER, DataTypes } from 'sequelize';
const  sequelize = require( '../utils/database' );

const Product = sequelize.define( 'product', {
    id:          { type: Sequelize.INTEGER, autoIncrement: true, 
                    primaryKey: true, allowNull: false        },
    title:       { type: Sequelize.STRING,  allowNull: false  },
    price:       { type: Sequelize.DECIMAL, allowNull: false  },
    prodDate:    { type: Sequelize.BIGINT,  allowNull: false  },
    description: { type: Sequelize.STRING,  allowNull: false  },
    image:       { type: Sequelize.STRING,  allowNull: false  }
} );

export default Product;