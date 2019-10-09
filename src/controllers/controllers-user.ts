import User from '../models/models-user';
import accessController from '../utils/access_controller';

export function getUsrRegister ( req, res, next ) {
    //accessController( req, res, next, { isLogged: true
    //    , roles: { admin: 1 } } );

    res.render( 'user/register', { usr: {}, userLogged: req[ 'userLogged' ] } );
}

export function postUsrRegister ( req, res, next ) {
    try {
        new User( 
                req.body[ 'names'           ],
                req.body[ 'email'           ],
                req.body[ 'password'        ],
                req.body[ 'password_repeat' ]
            ).create().then( usr => {
                postUsrLogin( req, res, next );
            } ).catch( errMessage => {
                res.render( 'user/register', { usr: req.body, ERR: errMessage } );
            } ); 
    } catch( errMsg ) {
        res.render( 'user/register', { usr: req.body, ERR: errMsg } );
    }
}

export function getUsrLogin ( req, res, next ) {
    res.render( 'user/login', { usr: {}, userLogged: req[ 'userLogged' ] } );
}

export function postUsrLogin ( req, res, next ) {
    User.findByEmailPassword(
        req.body[ 'email'    ],
        req.body[ 'password' ]
    ).then( user => {
        req.session[ 'loginToken' ] = user.loginToken;
        res.render( 'user/loggedIn', { loginToken: user.loginToken
            , path: req.body[ 'path' ] } );
    } ).catch( errMessage => {
        errMessage = 'Wrong Username or Password...';
        res.render( 'user/login', { usr: req.body, ERR: errMessage } );
    } );
}

export function getUsrLogout ( req, res, next ) {
    if ( req.userLogged ) {
        req.session.destroy();

        res.redirect( '/' );
    }
}

export function getUsrAddProduct ( req, res, next ) {
    res.render( 'user/product-add', { usr: {}, userLogged: req[ 'userLogged' ] } );
}