const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from "@/lib/db"

const signin = async (req: any, res: any) => {
    const user = await prisma.users.findUnique({ where: { email: req.body.email } })

    if (!user) {
        throw new Error(res.status(401).json({ 'error': 'Invalid email or password' }))
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        throw new Error(res.status(401).json({ 'error': 'Invalid email or password' }))
    } else {
        try{
        const userToken = jwt.sign({ userId: user }, process.env.JWT_SECRET);
        const updatedUser = await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                token: userToken
            }
        })
        const userInfo = {
            id:updatedUser.id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            address: updatedUser.address,
            image: updatedUser.image,
            role: updatedUser.role,
            created_at: updatedUser.created_at,
            created_by: updatedUser.created_by,
            updated_at: updatedUser.updated_at,
            updated_by: updatedUser.updated_by,
            token: updatedUser.token,
        }
        res.status(200).json({userInfo,'message' : 'Login successfully.'})
    }
    catch(error){
         res.status(500).json({'message' : 'Somthing went wrong'})
         return error
    }
    }

}

export default signin