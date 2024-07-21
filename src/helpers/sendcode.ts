import * as nodemailer from "nodemailer";

export default async function sendOtp(
  otp: string,
  userMail: string,
): Promise<{ success: boolean; message: string }> {
  try {

    // using nodemailer

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userMail,
      subject: "Email Verification For E-Commerce Account",
      text: `Your verification token is: ${otp}`,
    };

    await transport.sendMail(mailOptions);

    console.log("otp sent successfully to : " + userMail + "  " + otp);
    return { success: true, message: "OTP verification successful" };
  } catch (error) {
    console.error("Error occurred during OTP sending:", error);
    return { success: false, message: "OTP verification failed" };
  }
}