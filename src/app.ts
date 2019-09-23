"use strict";

import express from 'express';
import path    from 'path';

const app = express();

const rootDir = path.dirname( process.mainModule.filename );
app.use( express.static( path.join( rootDir, 'public' ) ) );

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

app.get( '/', ( req, res, next ) => {
    res.render( 'hello-world' );
} );

app.listen( process.env.PORT || 3000, () => {
    console.log( 'Listening on port 3000' );
} );