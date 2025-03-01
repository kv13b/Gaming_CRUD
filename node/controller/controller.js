import { pool } from "../connection.js";
import { setUser } from "../auth.js";
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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    const [results] = await pool.query(
      "SELECT email, RecId FROM SignUp WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      const { email, RecId } = results[0];
      const token = setUser(RecId, email);

      res.cookie("uid", token, { httpOnly: true }); // Secure cookie

      return res
        .status(200)
        .json({ success: true, message: "User logged in", token });
    } else {
      return res.status(404).json({ success: false, message: "No user found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
export default { createuser, getuser, login };
