"use strict";

import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';

import rootDir    from './utils/root-dir';
import routesUser from './routes/routes-user';
const sequelize = require( './utils/database' );
import repositories from './repositories/repositories';
import User from './models/models-user';

const app = express();

app.use( express.static(  path.join( rootDir, 'public' ) ) );
app.use( bodyParser.urlencoded( { extended: false }      ) );

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

repositories();

app.use( session( { secret: 'one' } ) );

// make user authentication
app.use( ( req, res, next ) => {
    if ( 
        ( req[ 'session' ]
        && req[ 'session' ][ 'loginToken' ] )
        || ( req.body[ 'email' ] && req.body[ 'password' ] )
    ) {
        if ( req.body[ 'email' ] && req.body[ 'password' ] ) {
            next();
        } else {
            User.findByToken( req[ 'session' ][ 'loginToken' ] ).then( user => {
                req[ 'userLogged' ] = user;
                next();
            } ).catch( str => {
                debugger;
            } );
        }
    }
    else { 
        res.render( 'user/login', { usr: {} } );
    }
} );

app.use( '/', routesUser );

app.get( '/', ( req, res, next ) => {
    res.render( 'home' );
} );


app.use( ( req, res, next ) => {
    res.render( '404' );
} );

sequelize.sync().then( result => {
    app.listen( process.env.PORT || 3000, () => {
        console.log( 'Listening on port 3000' );
    } );
} ).catch( err => {
    console.log( err );
} );