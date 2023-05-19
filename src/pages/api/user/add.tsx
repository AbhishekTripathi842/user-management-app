import prisma from "@/lib/db"
import { Request, Response } from 'express';
import encryptpassword from '../../../common/encryptpassword'

const adduser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.users.create({
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: encryptpassword(req.body.password),
        address: req.body.address,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        role: req.body.role
      },
    })
    res.status(200).json({ message : 'new user created' })
  } catch (error) {
    res.status(500).json({ message : 'somthing went wrong' })
    return error
  }
};

export default adduser