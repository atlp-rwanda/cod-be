import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const jwtToken=process.env.JWT_KEY || 'newUser';
const isAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        const token  = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({error: 'Unauthenticated'})
        }
        jwt.verify(token, jwtToken, (err, decoded) => {
            if (err) {
                res.status(401).json({error: 'Unauthenticated'})
            } else {
                let email = (decoded.email);
                let id=(decoded.id);
                if (email != null && id!=null) {
                    req.userEmail=email;
                    req.userId=id;
                    next();
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
