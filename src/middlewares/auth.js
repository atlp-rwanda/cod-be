import jwt from 'jsonwebtoken'
const isAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        const token  = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({error: 'Unauthenticated'})
        }
        jwt.verify(token, 'blogUser', (err, decoded) => {
            if (err) {
                res.status(401).json({error: 'Unauthenticated'})
            } else {
                let email = (decoded.email);
                let id=(decoded.id);
                if (email != null && id!=null) {
                    next(email,id);
                } else {
                    res.status(404).json({error: 'Wrong authentication email'})
                }
            }
        })
    } else {
        res.status(401).json({error: 'Unauthenticated'})
    }
}

export {isAdmin}
