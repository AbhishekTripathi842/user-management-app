import prisma from "@/lib/db"
import { Request, Response } from 'express';

const viewuser = async (req: Request, res: Response) => {
    const userId:any = req.query.id;
    try {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(userId) },
          });
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message : 'somthing went wrong' })
        return error
    }
};


export default viewuser