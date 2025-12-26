import { user } from "../models/user.model.js";
const registerUser = async (req, res) => {
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
            message : "User Registered yeah boy", 
            User : {id : User._id, email : User.email, username : User.username}
        })
    } catch (error) {
        res.status(500).json({message : "internal error, hamari galti", error : error.message})
    }
}
const userLogin = async (req, res) => {
    try {
        const { email , password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message : "all fields are important, incomplete"});
        }
        const existing = await user.findOne({
            email : email.toLowerCase()
        })
        if (!existing) {
            return res.status(404).json({message : "user not found"})
        };

        const isMatch = await existing.comparePassword(password)
        if (!isMatch) return res.status(400).json({message : "invalid credentials"})
        
        res.status(200).json({
            User: {
                id : existing._id, email : existing.email, username : existing.username
            }
        })
    }
    catch (error) {
        res.status(500).json({message : "internal error, hamari galti", error : error.message})
    }
}
const userLogout = async (req, res) => {
    try {
        
        const {email} = req.body;
        const User = await user.findOne({
            email 
        })
        if (!user) { return res.status(404).json({
            message : "no user found"
        })}
        res.status(200).json({
            message : "logout successful"
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error."
        })
    }
} 
export {
    registerUser, userLogin, userLogout
}