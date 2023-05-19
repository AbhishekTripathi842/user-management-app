import prisma from "@/lib/db"
import { Request, Response } from 'express';
import encryptpassword from '../../../common/encryptpassword'
import bcrypt from 'bcrypt';

let changePassword =  async (req: any, res: any) => {
    const user = await prisma.users.findUnique({ where: { email: req.body.email } })
    if (!user) {
        throw new Error(res.status(401).json({ 'error': 'Invalid email or password' }))
    }
    const validPassword = await bcrypt.compare(req.body.current_password, user.password)
    if(!validPassword){
        res.status(401).json({ 'error': 'your old password is wrong' })
    }else{
        try{
        await prisma.users.update({
            where: {
                email: user.email,
            },
            data: {
                password: encryptpassword(req.body.new_password)
            }
        })
        res.status(200).json({'status':'password changed successfully'})
    }
    catch(error){
        res.status(500).json({'message':'Somthing went wrong'})
        return error
    }
    }
};

export default changePassword