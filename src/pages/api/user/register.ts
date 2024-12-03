import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth";

export default async function handler  (req:NextApiRequest, res:NextApiResponse){

    if (req.method === 'POST') {
        await signUp(req.body,(status :boolean ,message? : string) =>{
            if (status) {
                res.status(200).json({status: true, statusCode:200 , message:"success"})
            }else{
                if (message && message == 'EmailonUse') {
                    res.status(409).json({status: true, statusCode:409 , message:"Email Already Used"})
                }
                res.status(400).json({status: true, statusCode:400 , message:"failed"})
            }
        })
    }else{
        res.status(405).json({status: false, statusCode:405, message:"method salah"})
    }

    res.status(200).json({status: true,message:"success"})
}
