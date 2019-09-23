"use strict";

import express from 'express';

const app = express();

app.get( '/', ( req, res, next ) => {
    res.write( 'Hello, world!' );
    res.end();
} );

app.listen( process.env.PORT || 3000, () => {
    console.log( 'Listening on port 3000' );
} );