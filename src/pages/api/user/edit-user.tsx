import prisma from "@/lib/db"
import { Request, Response } from 'express';
import encryptpassword from '../../../common/encryptpassword'

const edituser =  async (req: Request, res: Response) => {
  let id:any = req.headers.id
  try {
   let {first_name,last_name,address,image} = req.body
   let updatedData : {[k: string]: any} = {};
   if(first_name){
    updatedData.first_name = first_name;
   }
   if(last_name){
    updatedData.last_name = last_name;
   }
   if(address){
    updatedData.address = address;
   }
   if(image){
    updatedData.image = image;
   }
   const updatedUser = await prisma.users.update({
    where: { id:id  },
    data: updatedData,
  });
  res.status(200).json(updatedUser);
    
  } catch (error) {
    res.status(500).json({'message':'somthing went wrong'});
    return error
  }
};

export default edituser