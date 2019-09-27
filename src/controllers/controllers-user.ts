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
                res.render( 'user/registered' );
            } ).catch( errMessage => {
                res.render( 'user/register', { usr: req.body, ERR: errMessage } );
            } ); 
    } catch( errMsg ) {
        res.render( 'user/register', { usr: req.body, ERR: errMsg } );
    }
}