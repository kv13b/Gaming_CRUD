import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendMailer = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "karthikbhatt13@gmail.com",
        pass: process.env.APP_PASS_KEY,
      },
    });

    const mailOptions = {
      from: "karthikbhatt13@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };
    console.log(email);
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(" Error:", error.message);
    return { success: false, error: error.message };
  }
};

export default sendMailer;
