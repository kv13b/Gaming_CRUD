import { pool } from "../connection.js";
import { setUser } from "../auth.js";
import crypto from "crypto";
import sendMailer from "./sendmail.js";

function generateOtp() {
  return crypto.randomInt(1000, 10000).toString();
}

const getcode = async (req, res) => {
  if (!req.body || !req.body.Email) {
    return res.status(400).json({ Valid: false, message: "Email is required" });
  }

  const { Email } = req.body;

  try {
    // Check if the email exists
    const [results] = await pool.query(
      "SELECT Email FROM TB_UserMaster WHERE Email = ?",
      [Email]
    );

    if (results.length > 0) {
      // Email exists, generate OTP
      const otp = generateOtp();

      // Update OTP in the database
      await pool.query("UPDATE TB_UserMaster SET OTP = ? WHERE Email = ?", [
        otp,
        Email,
      ]);
      const message = `Welcome to Cheat Code Your Verification code is ${otp}`;
      const subject = "Hii from Cheat Code";
      console.log("Verification successful");
      const sentmail = await sendMailer(Email, subject, message);
      if (sentmail.success) {
        return res.json({
          Valid: true,
          message:
            "Verification code has been sent to your registered mail ID.",
        });
      }
    } else {
      console.log("Verification failed");
      return res.status(404).json({
        Valid: false,
        message: "Invalid Email ID.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ Valid: false, message: "Internal Server Error" });
  }
};

const Register = async (req, res) => {
  if (!req.body || !req.body.OTP) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter Verification code" });
  }
  if (!req.body || !req.body.Password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter Password" });
  }

  const { Email, OTP, Password } = req.body;

  try {
    // Check if Email and OTP match
    const [results] = await pool.query(
      "SELECT Email FROM TB_UserMaster WHERE Email = ? AND OTP = ?",
      [Email, OTP]
    );

    if (results.length > 0) {
      // Email & OTP matched, update Password
      await pool.query(
        "UPDATE TB_UserMaster SET Password = ? WHERE Email = ? AND OTP = ?",
        [Password, Email, OTP]
      );

      console.log("Registration successful");
      return res.json({
        success: true,
        message: "Registration successful. Please Sign In.",
      });
    } else {
      console.log("Registration failed");
      return res
        .status(400)
        .json({ success: false, message: "Invalid Verification code." });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const [results] = await pool.query(
      "SELECT email, RecId FROM TB_UserMaster WHERE email = ? AND password = ?",
      [Email, Password]
    );

    if (results.length > 0) {
      const { Email, RecId } = results[0];
      // Generate token or session for authentication
      const token = setUser(RecId, Email);
      res.cookie("uid", token, { httpOnly: true });

      return res
        .status(200)
        .json({ success: true, message: "Login successful", token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const resetpassword = async (req, res) => {
  if (!req.body || !req.body.OTP) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter Verification code" });
  }
  if (!req.body || !req.body.newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter Password" });
  }

  const { Email, OTP, newPassword } = req.body;

  try {
    // Fetch the existing password from the database
    const [fetchPasswordResult] = await pool.query(
      "SELECT password FROM TB_UserMaster WHERE Email = ? AND OTP=?",
      [Email, OTP]
    );

    if (fetchPasswordResult.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials " });
    }

    const existingPassword = fetchPasswordResult[0].password;

    // Check if new password is the same as the old password
    if (existingPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the existing password",
      });
    }

    // Update the password
    await pool.query("UPDATE TB_UserMaster SET password = ? WHERE Email = ?", [
      newPassword,
      Email,
    ]);

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default { Login, getcode, Register, resetpassword };
