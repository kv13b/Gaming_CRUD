import { pool } from "../connection.js";
const Clientinsert = async (req, res) => {
  // Validate mandatory fields
  if (
    !req.body ||
    !req.body.Name ||
    !req.body.ContactNo ||
    !req.body.Email ||
    !req.body.UserId
  ) {
    return res.status(400).json({
      Valid: false,
      message: "Please enter the mandatory fields",
    });
  }

  // Extract fields from request body
  const { Name, Address, ContactNo, Email, UserId } = req.body;

  try {
    // Insert client data into database
    const [result] = await pool.query(
      `INSERT INTO client_master (Name, Address, ContactNo, Email, UserId, Entry_Date, recordstatus) 
       VALUES (?, ?, ?, ?, ?, NOW(), 1)`,
      [Name, Address, ContactNo, Email, UserId]
    );
    if (result.affectedRows > 0) {
      console.log("Client insertion successful");
      return res.json({
        Valid: true,
        message: "Client insertion successful",
      });
    } else {
      console.log("Client insertion failed");
      return res.status(400).json({
        Valid: false,
        message: "Client insertion failed",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      Valid: false,
      message: "Internal Server Error",
    });
  }
};

export default { Clientinsert };
