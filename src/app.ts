"use strict";

import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import session     from 'express-session';

import rootDir      from './utils/root-dir';
import routesUser   from './routes/routes-user';
import routesAdmin  from './routes/routes-admin';
const sequelize     = require( './utils/database' );
import repositories from './repositories/repositories';
import settings from './utils/settings';

const app = express();

app.use( express.static(  path.join( rootDir, 'public' ) ) );
app.use( bodyParser.urlencoded( { extended: false }      ) );

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' ); 

repositories();

app.use( session( { secret: 'one' } ) );

// make user authentication
app.use( settings.userLogin );

app.use( '/', routesUser );
app.use( '/admin', routesAdmin );

app.get( '/', ( req, res, next ) => {
    res.render( 'home', { userLogged: req[ 'userLogged' ] } );
} );


app.use( ( req, res, next ) => {
    res.render( '404', { userLogged: req[ 'userLogged' ] } );
} );

sequelize.sync().then( result => {
    app.listen( process.env.PORT || 3000, () => {
        console.log( 'Listening on port 3000' );
    } );
} ).catch( err => {
    console.log( err );
} );