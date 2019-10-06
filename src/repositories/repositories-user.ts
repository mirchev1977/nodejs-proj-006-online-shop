import Sequelize from 'sequelize';
const  sequelize = require( '../utils/database' );

const User = sequelize.define( 'user', {
    id:       { type: Sequelize.INTEGER, autoIncrement: true, 
                primaryKey: true, allowNull: false },
    names:    Sequelize.STRING,
    email:    { type: Sequelize.STRING, allowNull: false  },
    password: { type: Sequelize.STRING, allowNull: false  },
    role:     { type: Sequelize.STRING, allowNull: false  }
} );

export default User;