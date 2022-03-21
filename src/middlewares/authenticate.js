import jwt from "jsonwebtoken"
import {LoggedInUser} from "../database/models";

const  isLoggedIn = async (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
 try{
   if (token == undefined) return res.sendStatus(401);
   const user = await jwt.verify(token, process.env.JWT_KEY)
   if(!user){
       return res.sendStatus(403);
   }
   const loggedIn = await LoggedInUser.findOne({where:{user_id:user.id}})
   if(!loggedIn){
       return res.status(401).send("Please Log in")
   }
   req.user = user;
     next();
 
}
catch(error){
   return res.send("Failed to authenticate the user");
}
}
 export default isLoggedIn