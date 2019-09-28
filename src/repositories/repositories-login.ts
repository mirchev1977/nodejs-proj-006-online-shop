import Sequelize from 'sequelize';
const  sequelize = require( '../utils/database' );

const Login = sequelize.define( 'login', {
    id:     { type: Sequelize.INTEGER, autoIncrement: true, 
                primaryKey: true, allowNull: false },
    token:  Sequelize.STRING,
} );

export default Login;