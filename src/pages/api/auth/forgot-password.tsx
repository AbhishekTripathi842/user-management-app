const jwt = require('jsonwebtoken')
import { Request, Response } from 'express';
import prisma from "@/lib/db"
import nodemailer from 'nodemailer';

const forogtPassword = async (req: any, res: any) => {
    const user = await prisma.users.findUnique({ where: { email: req.body.email } })
    if (!user) {
        throw new Error(res.status(401).json({ 'error': 'Invalid email' }))
    }
    const userToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    await sendPasswordResetEmail(user.email, userToken);
    res.status(200).json({ message: 'Password reset email sent' });
}

async function sendPasswordResetEmail(email: any, token: any) {
    const transpor: any = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0feca206a35a2f",
          pass: "f2e251543405db"
        }
    });

    const message = {
        from: 'abhishektripathi842@gmail.com',
        to: email,
        subject: 'Reset your password',
        text: `Click this link to reset your password: http://localhost:3000/reset-password?token=${token}`,
        html: `<p>Click <a href="http://localhost:3000/reset-password?token=${token}">this link</a> to reset your password</p>`,
    };

    await transpor.sendMail(message, (err: any, info: any) => {
        if (err) {
            return err
        }
    });

}

export default forogtPassword
















