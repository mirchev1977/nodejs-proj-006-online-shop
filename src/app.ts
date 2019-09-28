"use strict";

import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';

import rootDir    from './utils/root-dir';
import routesUser from './routes/routes-user';
const sequelize = require( './utils/database' );
import repositories from './repositories/repositories';

const app = express();

app.use( express.static(  path.join( rootDir, 'public' ) ) );
app.use( bodyParser.urlencoded( { extended: false }      ) );

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

repositories();

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