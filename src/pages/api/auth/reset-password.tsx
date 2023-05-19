const jwt = require('jsonwebtoken')
import { Request, Response } from 'express';
import prisma from "@/lib/db"
import encryptpassword from '../../../common/encryptpassword'

const resetPassword =  async (req: any, res: any) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email
    const user = await prisma.users.findUnique({ where: { email: userEmail } })
    if (!user) {
        throw new Error(res.status(401).json({ 'error': 'Invalid email' }))
    }else{
        try{
        await prisma.users.update({
            where: {
                email: userEmail,
            },
            data: {
                password: encryptpassword(req.body)
            }
        })
        res.status(200).json({'status':'password changed successfully'})
    }
    catch(error){
        res.status(500).json({ 'message' : 'somthing went wrong' })
        return error
    }
    }
}

export default resetPassword