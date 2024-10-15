import { Request, Response } from "express";
import { responseCodes } from "../../utils/response-codes";
import { generateOTP, sendOtpEmail } from "./send-email-otp.controller";
import { prisma } from "../../config/dbConnect";
export const send_forgot_password_otp = async(req: Request, res: Response) =>{
    try {
        const { email } = req.body;
        const otp = generateOTP();
        await sendOtpEmail(email, otp, 'Forgot Password OTP', `Your OTP for forgot Password is: ${otp}. It is valid for 10 minutes.`).then(() => console.log('OTP sent!'));
        responseCodes.success.ok(res, {}, "otp sent");
      }
      catch (error) {
        console.log(error);
        responseCodes.serverError.internalServerError(res, "internal error");
      }
}