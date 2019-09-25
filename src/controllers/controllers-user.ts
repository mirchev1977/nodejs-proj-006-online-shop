import User from '../entities/entities-user';

export function getUsrRegister ( req, res, next ) {
    res.render( 'user/register' );
}

export function postUsrRegister ( req, res, next ) {
    const usr = new User( 
            req.body[ 'names'           ],
            req.body[ 'email'           ],
            req.body[ 'password'        ],
            req.body[ 'password_repeat' ]
        );
    res.render( 'user/registered' );
}