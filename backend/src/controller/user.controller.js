import { user } from "../models/user.model.js";
const registerUser = async = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({message : "All fiels are important"})
        }
        const existing = await user.findOne({email : email.toLowerCase()});
        if (existing) {
            return res.status(400).json({message : "User Already Exists"})            
        }

        const User = await user.create({
            username,  email : email.toLowerCase(), password, loggedin : false 
        })
        res.status(201).json({
            message : "User Registered", 
            User : {id : User._id, email : User.email, username : User.username}
        })
    } catch (error) {
        res.status(500).json({message : "internal error, hamari galti", error : error.message})
    }
}
export {
    registerUser
}