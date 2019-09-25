import User from '../entities/entities-user';

export function getUsrRegister ( req, res, next ) {
    res.render( 'user/register', { usr: {} } );
}

export function postUsrRegister ( req, res, next ) {
    try {
        const user = new User( 
                req.body[ 'names'           ],
                req.body[ 'email'           ],
                req.body[ 'password'        ],
                req.body[ 'password_repeat' ]
            );

        res.render( 'user/registered' );
    } catch( errMsg ) {
        res.render( 'user/register', { usr: req.body, ERR: errMsg } );
    }
}