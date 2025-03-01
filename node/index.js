import express from "express";
import { checkconnection } from "./connection.js";
const app = express();
import routes from "./routes/routes.js";
app.use(express.json()); //middleware
app.use("/auth", routes);
app.listen(3000, async () => {
  console.log("server started at 3000");
  try {
    await checkconnection();
  } catch (error) {
    console.log(error);
  }
});
