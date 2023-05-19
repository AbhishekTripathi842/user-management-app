import prisma from "@/lib/db"
import { Request, Response } from 'express';

const userlist =  async (req: Request, res: Response) => {
    try {
        const result = await prisma.users.findMany()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({'message':'Somthing went wrong'})
        return error
    }
};

export default userlist