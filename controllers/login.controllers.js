import User from "../models/user.model.js"
import {hash} from "../utils/hash.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    const salt = user.password.substring(0, process.env.SALT_SIZE)
    const hased = hash(password, salt)
    if (user.password === hased){
        const token = jwt.sign({id:user._id}, process.env.JWT, {expiresIn:"1h"})
        res.json({login:true, msg:"ok", user:user, token:token})
    }
    else {
        res.status(404).json({login:false, msg:"no ok", user:{}, token:""})
    }
}