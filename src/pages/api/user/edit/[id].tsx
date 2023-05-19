import prisma from "@/lib/db"
import { Request, Response } from 'express';

const edituser =  async (req: Request, res: Response) => {
    const userId = req.query.id;
    try {
        let { first_name, last_name, address, image, role } = req.body
        let updatedData: { [k: string]: any } = {};
        if (first_name) {
            updatedData.first_name = first_name;
        }
        if (last_name) {
            updatedData.last_name = last_name;
        }
        if (address) {
            updatedData.address = address;
        }
        if (image) {
            updatedData.image = image;
        }
        if (role) {
            updatedData.role = role;
        }
        const updatedUser = await prisma.users.update({
            where: { id: Number(userId) },
            data: updatedData,
        });
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ 'message': 'somthing went wrong' })
        return error
    }
};

export default edituser
