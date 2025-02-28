import { pool } from "../connection.js";

const createuser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All feilds are required" });
    }
    const [results] = await pool.query(
      "SELECT email FROM SignUp WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }
    await pool.query("INSERT INTO SignUp(name,email,password)VALUES(?,?,?)", [
      fullName,
      email,
      password,
    ]);
    return res.json({ success: true, message: "User created successfully" });
    // const accesstoken = jwt.sign(
    //   { userId: user._id },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: "72h",
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
};

const getuser = async (req, res) => {};
export default { createuser, getuser };
