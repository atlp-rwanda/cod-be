
import * as validations from '../validations/index';
import  * as userService from '../services/userService';

const getRoleId=async(request,response,next)=>{
    try {
        const email=request.userEmail;
        const userId=request.userId;
        const isLoggedAdmin=userService.isAdmin(email,userId);
        if (!isLoggedAdmin) {
           return response.status(402).json({error: 'Unauthorized'});
        }
        const validateRole=await validations.roleSchema.validate(request.body);
        response.send("end of call json");
    } catch (error) {
        response.status(500).json({'Error':'An error occured, try again!'});
        next(error)
    }
}
export {getRoleId}
