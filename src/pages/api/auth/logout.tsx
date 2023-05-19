// import prisma from "../../../../lib/db"
import prisma from '@/lib/db';
import { Request, Response } from 'express';

const logout =  async (req: any, res: any) => {
    let userId = parseInt(req.body) 

    try {
        const post = await prisma.users.update({
            where: { id : userId },
            data: { token: null },
          })
      res.status(200).json({'message':'user logout successfully'})
  } catch ( error ) {
    res.status(500).json({'message':'somthing went wrong'})
    return error
  }
  };

  export default logout