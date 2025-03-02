import express from "express";
import { checkconnection } from "./connection.js";
import cors from "cors";
const app = express();
import routes from "./routes/routes.js";
app.use(express.json()); //middleware

app.use(cors());
app.use("/auth", routes);
app.get("/auth", (req, res) => {
  console.log("auth");
  res.send("ff");
});
app.listen(3000, async () => {
  console.log("server started at 3000");
  try {
    await checkconnection();
  } catch (error) {
    console.log(error);
  }
});
