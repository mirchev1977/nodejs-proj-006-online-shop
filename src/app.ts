"use strict";

import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';

import routesUser from './routes/routes-user';

const app = express();

const rootDir = path.dirname(   process.mainModule.filename      );
app.use( express.static(        path.join( rootDir, 'public' ) ) );
app.use( bodyParser.urlencoded( { extended: false }            ) );

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

app.use( '/', routesUser );

app.get( '/', ( req, res, next ) => {
    res.render( 'home' );
} );


app.use( ( req, res, next ) => {
    res.render( '404' );
} );

app.listen( process.env.PORT || 3000, () => {
    console.log( 'Listening on port 3000' );
} );