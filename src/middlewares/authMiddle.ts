import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export async function authMiddle(req: Request, res: Response, next: NextFunction){
    const {token} = req.headers;
    if(!token){
        res.status(401).json({message: "Token is required. Unauthorized"});
        return;
    }
    try{
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as {username: string};
        const user = await User.findOne({username: decoded.username});
        if(!user){
            res.status(401).json({message: "Unauthorized: User not found. Please sign up"});
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message: "Unauthorized: Invalid token"});
        return;
    }
}