import User from '../models/models-user';

export function getUsrRegister ( req, res, next ) {
    res.render( 'user/register', { usr: {} } );
}

export function postUsrRegister ( req, res, next ) {
    try {
        new User( 
                req.body[ 'names'           ],
                req.body[ 'email'           ],
                req.body[ 'password'        ],
                req.body[ 'password_repeat' ]
            ).create().then( usr => {
                res.render( 'user/registered', { loginToken: usr.loginToken } );
            } ).catch( errMessage => {
                res.render( 'user/register', { usr: req.body, ERR: errMessage } );
            } ); 
    } catch( errMsg ) {
        res.render( 'user/register', { usr: req.body, ERR: errMsg } );
    }
}

export function getUsrLogin ( req, res, next ) {
    res.render( 'user/login', { usr: {} } );
}

export function postUsrLogin ( req, res, next ) {
    User.findByEmailPassword(
        req.body[ 'email'    ],
        req.body[ 'password' ]
    ).then( user => {
        req.session[ 'loginToken' ] = user.loginToken;
        console.log( 'FindAllUser: ', user );
        res.render( 'user/loggedIn', { loginToken: user.loginToken } );
    } ).catch( errMessage => {
        errMessage = 'Wrong Username or Password...';
        res.render( 'user/login', { usr: req.body, ERR: errMessage } );
    } );
}