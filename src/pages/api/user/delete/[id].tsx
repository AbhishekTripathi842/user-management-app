// import prisma from "../../../../lib/db"
import prisma from '@/lib/db';
import { Request, Response } from 'express';

const deleteuser = async (req: any, res: any) => {
    let userId = parseInt(req.query.id)
    try {
        const post = await prisma.users.delete({
            where: {
              id: userId
            }
          })
      res.status(200).json({'message':'user deleted successfully'})
  } catch ( error ) {
    res.status(500).json({'message':'somthing went wrong'})
    return error
  }
  };

  export default deleteuser